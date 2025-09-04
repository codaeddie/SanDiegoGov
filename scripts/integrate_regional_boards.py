#!/usr/bin/env python3
"""
Integrate regional authority boards and committees into main entities
"""

import csv
import os

def integrate_regional_boards():
    """Add regional boards to main boards and commissions file"""
    
    data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    
    # Source file (regional boards/committees)
    source_file = os.path.join(data_dir, 'sd_regional_boards_committees_2025.csv')
    # Target file (main boards and commissions)
    target_file = os.path.join(data_dir, 'sd_gov_boards_commissions.csv')
    
    if not os.path.exists(source_file):
        print(f"Source file not found: {source_file}")
        return
    
    # Read existing boards/commissions
    existing_entities = []
    with open(target_file, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        existing_entities = list(reader)
    
    # Read regional boards/committees
    regional_entities = []
    with open(source_file, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Convert to standard format
            entity = {
                'id': row.get('id', ''),
                'name': row.get('official_name', ''),
                'type': 'Board' if 'Board' in row.get('official_name', '') else 'Committee',
                'jurisdiction': 'Regional',
                'parent_entity': row.get('parent_organization', ''),
                'website_url': row.get('website_url', ''),
                'description': row.get('description_purpose', ''),
                'members_count': row.get('member_count', ''),
                'appointment_authority': row.get('appointment_authority', ''),
                'meeting_schedule': row.get('meeting_schedule', ''),
                'creation_date': '',
                'legal_source': 'Regional Authority Governance',
                'last_verified': '2024-09-03'
            }
            regional_entities.append(entity)
    
    # Combine all entities
    all_entities = existing_entities + regional_entities
    
    # Write updated file
    fieldnames = ['id', 'name', 'type', 'jurisdiction', 'parent_entity', 'website_url', 
                 'description', 'members_count', 'appointment_authority', 'meeting_schedule',
                 'creation_date', 'legal_source', 'last_verified']
    
    with open(target_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_entities)
    
    print(f"Integrated {len(regional_entities)} regional boards/committees")
    print(f"Total boards/commissions: {len(all_entities)}")
    
    return len(all_entities)

if __name__ == "__main__":
    integrate_regional_boards()