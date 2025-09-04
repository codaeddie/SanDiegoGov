#!/usr/bin/env python3
"""
Data quality validation for San Diego government entities
Following SF CivLab quality standards
"""

import csv
import os
import requests
import time
from urllib.parse import urlparse

def validate_urls(csv_file):
    """Validate all URLs in the CSV file"""
    print(f"\n=== URL Validation for {os.path.basename(csv_file)} ===")
    
    invalid_urls = []
    valid_count = 0
    total_count = 0
    
    with open(csv_file, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            url = row.get('website_url', '').strip()
            if url:
                total_count += 1
                try:
                    # Basic URL validation
                    parsed = urlparse(url)
                    if not parsed.scheme or not parsed.netloc:
                        invalid_urls.append((row.get('id', ''), url, 'Invalid URL format'))
                        continue
                    
                    # HTTP validation (with timeout)
                    response = requests.head(url, timeout=10, allow_redirects=True)
                    if response.status_code >= 400:
                        invalid_urls.append((row.get('id', ''), url, f'HTTP {response.status_code}'))
                    else:
                        valid_count += 1
                        
                except requests.RequestException as e:
                    invalid_urls.append((row.get('id', ''), url, f'Request error: {str(e)[:50]}'))
                except Exception as e:
                    invalid_urls.append((row.get('id', ''), url, f'Error: {str(e)[:50]}'))
                
                # Rate limiting
                time.sleep(0.5)
    
    print(f"Valid URLs: {valid_count}/{total_count} ({valid_count/total_count*100:.1f}%)")
    
    if invalid_urls:
        print(f"\nInvalid URLs found:")
        for entity_id, url, error in invalid_urls[:10]:  # Show first 10
            print(f"  {entity_id}: {url} - {error}")
        if len(invalid_urls) > 10:
            print(f"  ... and {len(invalid_urls) - 10} more")
    
    return valid_count, total_count, invalid_urls

def validate_data_completeness(csv_file):
    """Validate data completeness for required fields"""
    print(f"\n=== Data Completeness for {os.path.basename(csv_file)} ===")
    
    required_fields = ['id', 'name', 'description', 'website_url', 'legal_source']
    field_stats = {field: {'total': 0, 'missing': 0} for field in required_fields}
    
    total_entities = 0
    
    with open(csv_file, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            total_entities += 1
            
            for field in required_fields:
                field_stats[field]['total'] += 1
                if not row.get(field, '').strip():
                    field_stats[field]['missing'] += 1
    
    print(f"Total entities: {total_entities}")
    print(f"Field completeness:")
    
    overall_completeness = 0
    for field in required_fields:
        missing = field_stats[field]['missing']
        total = field_stats[field]['total']
        complete = total - missing
        percentage = complete / total * 100 if total > 0 else 0
        overall_completeness += percentage
        
        print(f"  {field}: {complete}/{total} ({percentage:.1f}%)")
        
        if missing > 0 and missing <= 5:  # Show specific missing items if few
            print(f"    Missing in: ", end="")
            with open(csv_file, 'r', newline='', encoding='utf-8') as csvfile2:
                reader2 = csv.DictReader(csvfile2)
                missing_ids = []
                for row in reader2:
                    if not row.get(field, '').strip():
                        missing_ids.append(row.get('id', 'unknown'))
                        if len(missing_ids) >= 5:
                            break
                print(', '.join(missing_ids))
    
    overall_percentage = overall_completeness / len(required_fields)
    print(f"\nOverall completeness: {overall_percentage:.1f}%")
    
    return overall_percentage

def check_duplicates(csv_file):
    """Check for duplicate entities"""
    print(f"\n=== Duplicate Check for {os.path.basename(csv_file)} ===")
    
    seen_ids = set()
    seen_names = set()
    duplicate_ids = []
    duplicate_names = []
    
    with open(csv_file, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            entity_id = row.get('id', '').strip()
            name = row.get('name', '').strip().lower()
            
            if entity_id in seen_ids:
                duplicate_ids.append(entity_id)
            seen_ids.add(entity_id)
            
            if name in seen_names and name:
                duplicate_names.append(row.get('name', ''))
            seen_names.add(name)
    
    if duplicate_ids:
        print(f"Duplicate IDs found: {', '.join(duplicate_ids)}")
    else:
        print("No duplicate IDs found ✓")
        
    if duplicate_names:
        print(f"Duplicate names found: {', '.join(duplicate_names)}")
    else:
        print("No duplicate names found ✓")
    
    return len(duplicate_ids), len(duplicate_names)

def generate_quality_report():
    """Generate comprehensive quality report for all entity files"""
    
    data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    
    entity_files = [
        'sd_gov_elected.csv',
        'sd_gov_city_departments.csv',
        'sd_gov_county_departments.csv', 
        'sd_gov_regional_authorities.csv',
        'sd_gov_boards_commissions.csv',
        'sd_gov_entities_complete.csv'
    ]
    
    print("=" * 60)
    print("SAN DIEGO GOVERNMENT ENTITIES - DATA QUALITY REPORT")
    print("=" * 60)
    
    total_entities = 0
    total_completeness = 0
    total_url_valid = 0
    total_urls = 0
    total_duplicates = 0
    
    for filename in entity_files:
        file_path = os.path.join(data_dir, filename)
        
        if not os.path.exists(file_path):
            print(f"\nSkipping {filename} - file not found")
            continue
            
        print(f"\n" + "=" * 40)
        print(f"ANALYZING: {filename.upper()}")
        print("=" * 40)
        
        # Count entities
        with open(file_path, 'r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            entity_count = sum(1 for row in reader)
            total_entities += entity_count
        
        print(f"Entity count: {entity_count}")
        
        # Data completeness
        completeness = validate_data_completeness(file_path)
        total_completeness += completeness
        
        # Duplicate check  
        dup_ids, dup_names = check_duplicates(file_path)
        total_duplicates += dup_ids + dup_names
        
        # URL validation (skip master file to avoid double-counting)
        if filename != 'sd_gov_entities_complete.csv':
            valid_urls, total_file_urls, invalid_urls = validate_urls(file_path)
            total_url_valid += valid_urls
            total_urls += total_file_urls
    
    # Overall summary
    print(f"\n" + "=" * 60)
    print("OVERALL QUALITY SUMMARY")
    print("=" * 60)
    
    avg_completeness = total_completeness / len([f for f in entity_files if os.path.exists(os.path.join(data_dir, f))])
    url_success_rate = (total_url_valid / total_urls * 100) if total_urls > 0 else 0
    
    print(f"Total entities cataloged: {total_entities}")
    print(f"Average data completeness: {avg_completeness:.1f}%")
    print(f"URL validation success rate: {total_url_valid}/{total_urls} ({url_success_rate:.1f}%)")
    print(f"Total duplicates found: {total_duplicates}")
    
    # Quality score calculation
    quality_score = (avg_completeness + url_success_rate) / 2
    if total_duplicates == 0:
        quality_score += 5  # Bonus for no duplicates
    
    print(f"\nOverall Quality Score: {quality_score:.1f}/100")
    
    if quality_score >= 90:
        print("Quality Status: EXCELLENT ✅")
    elif quality_score >= 80:
        print("Quality Status: GOOD ✅") 
    elif quality_score >= 70:
        print("Quality Status: ACCEPTABLE ⚠️")
    else:
        print("Quality Status: NEEDS IMPROVEMENT ❌")
    
    return quality_score

if __name__ == "__main__":
    generate_quality_report()