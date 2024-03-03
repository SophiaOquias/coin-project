import os
import re
import random

def collect_gallery_items(directory):
    items = []
    # Regex to find complete gallery-item divs, including the closing </div> tag
    gallery_item_regex = re.compile(r'(<div class="gallery-item" tabindex="0".*?<img src="([^"]+)" alt="([^"]+)">.*?<p>(.*?)<\/p>.*?<\/div>)', re.DOTALL)

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                # The first group in each match is the whole div, which is what we're interested in
                items.extend(match[0] for match in gallery_item_regex.findall(content))

    return items

def update_html_with_gallery_items(directory, items):
    gallery_item_regex = re.compile(r'<div class="gallery-item" tabindex="0".*?<\/div>', re.DOTALL)

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                def replace_gallery_item(match):
                    if items:
                        item = random.choice(items)
                        items.remove(item)  # Remove the chosen item to avoid repetition
                        return item
                    return match.group(0)  # Return the original match if no items left

                new_content = gallery_item_regex.sub(replace_gallery_item, content)

                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)

# Directory containing your HTML files
project_directory = './'

# Collect all complete gallery items (entire div elements)
all_items = collect_gallery_items(project_directory)

# Randomize the order of gallery items
random.shuffle(all_items)

# Update HTML files with randomized gallery items, ensuring no extra </div> is added
update_html_with_gallery_items(project_directory, all_items)

print("Gallery items have been correctly randomized across the HTML pages, without adding extra </div> tags.")
