import trafilatura


def get_website_text_content(url: str) -> str:
    """
    This function takes a url and returns the main text content of the website.
    The text content is extracted using trafilatura and easier to understand.
    The results is not directly readable, better to be summarized by LLM before consume
    by the user.

    Some common website to crawl information from:
    MLB scores: https://www.mlb.com/scores/YYYY-MM-DD
    """
    # Send a request to the website
    downloaded = trafilatura.fetch_url(url)
    text = trafilatura.extract(downloaded)
    return text

# Search for HSDA national organization info
national_hsda_urls = [
    "https://www.hsdems.org",
    "https://hsda.org", 
    "https://www.highschooldemocrats.org"
]

for url in national_hsda_urls:
    print(f"Trying HSDA URL: {url}")
    try:
        hsda_content = get_website_text_content(url)
        if hsda_content:
            print("HSDA National Content:")
            print(hsda_content[:2000])
            break
    except Exception as e:
        print(f"Error with {url}: {e}")
        continue

# Search for Texas Democratic Party resources
texas_dem_url = "https://www.texasdemocrats.org"
print("Fetching Texas Democratic Party information...")
try:
    texas_content = get_website_text_content(texas_dem_url)
    print("Texas Democrats Content:")
    print(texas_content[:2000])  # First 2000 chars
    print("\n" + "="*50 + "\n")
except Exception as e:
    print(f"Error fetching Texas Democrats content: {e}")

# Search for Austin Democratic organizations
austin_dem_url = "https://www.austindemocrats.org"
print("Fetching Austin Democrats information...")
try:
    austin_content = get_website_text_content(austin_dem_url)
    print("Austin Democrats Content:")
    print(austin_content[:2000])  # First 2000 chars
except Exception as e:
    print(f"Error fetching Austin Democrats content: {e}")