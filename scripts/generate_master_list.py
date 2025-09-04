#!/usr/bin/env python3
"""
Generate master entity list combining all San Diego government entities
Similar to SF CivLab methodology for comprehensive government mapping
"""

import csv
import os
from datetime import datetime

def combine_entity_files():
    """Combine all entity CSV files into master list"""
    
    data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    
    # Input files
    input_files = [
        'sd_gov_elected.csv',
        'sd_gov_city_departments.csv', 
        'sd_gov_county_departments.csv',
        'sd_gov_regional_authorities.csv',
        'sd_gov_boards_commissions.csv'
    ]
    
    # Output file
    output_file = os.path.join(data_dir, 'sd_gov_entities_complete.csv')
    
    # Master entity structure
    master_headers = [
        'id', 'name', 'type', 'jurisdiction', 'parent_entity', 
        'website_url', 'description', 'legal_source', 'last_verified'
    ]
    
    all_entities = []
    entity_count = {'elected': 0, 'city_dept': 0, 'county_dept': 0, 'regional': 0, 'boards': 0}
    
    for filename in input_files:
        file_path = os.path.join(data_dir, filename)
        
        if not os.path.exists(file_path):
            print(f"Warning: {filename} not found")
            continue
            
        with open(file_path, 'r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            
            for row in reader:
                # Standardize fields across different entity types
                entity = {
                    'id': row.get('id', ''),
                    'name': row.get('name', ''),
                    'type': row.get('type', row.get('position', '')),
                    'jurisdiction': row.get('jurisdiction', 'San Diego County'),
                    'parent_entity': row.get('parent_entity', ''),
                    'website_url': row.get('website_url', ''),
                    'description': row.get('description', ''),
                    'legal_source': row.get('legal_source', ''),
                    'last_verified': row.get('last_verified', datetime.now().strftime('%Y-%m-%d'))
                }
                
                all_entities.append(entity)
                
                # Count by type
                if 'elected' in filename:
                    entity_count['elected'] += 1
                elif 'city_departments' in filename:
                    entity_count['city_dept'] += 1
                elif 'county_departments' in filename:
                    entity_count['county_dept'] += 1
                elif 'regional' in filename:
                    entity_count['regional'] += 1
                elif 'boards' in filename:
                    entity_count['boards'] += 1
    
    # Write master file
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=master_headers)
        writer.writeheader()
        writer.writerows(all_entities)
    
    print(f"Generated master entity list: {output_file}")
    print(f"Total entities: {len(all_entities)}")
    print(f"Breakdown:")
    print(f"  Elected officials: {entity_count['elected']}")
    print(f"  City departments: {entity_count['city_dept']}")
    print(f"  County departments: {entity_count['county_dept']}")
    print(f"  Regional authorities: {entity_count['regional']}")
    print(f"  Boards and commissions: {entity_count['boards']}")
    
    return len(all_entities)

if __name__ == "__main__":
    combine_entity_files()