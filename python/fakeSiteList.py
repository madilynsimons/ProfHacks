## Python module utilizing BeautifulSoup4, re.py, and requests
## Checks the site Fake News Checker for a list of
## fake news websites and compiles them into a txt file
## for use in in inject.js

from bs4 import BeautifulSoup
import re
import requests

fakeNews = 'http://www.fakenewschecker.com'

def main():
    tagList = import_sites()
    siteList = get_links(tagList)

    try:
        outfile = open('sites.txt', 'w')
    except e:
        print(e)

    for site in siteList:
        outfile.write(site + '\n')

def get_page_content(URL):
    """
    Returns: <BeautifulSoup> Object of the page URL specified.
    """
    page = requests.get(URL)
    return BeautifulSoup(page.content, 'html.parser')
    
def import_sites():
    """
    Returns a <list> of all tags on the page with the specified string in the href
    """
    content = get_page_content(fakeNews)

    return content.find_all(href=re.compile('fake-news-source'))

def get_links(tagList):
    """
    Loads the links of each website.

    URL names are encoded in the tag directly after the one containing 'Website'
    on each page.  That's about as smart as I get.

    Returns: a <list> of links from Fake News Checker, to be written to a file.
    """
    print('Getting sites:  |', end='')
    sites = []
    count = 0
    for link in tagList:
        siteURL = fakeNews + link.get('href')
        content = get_page_content(siteURL)

        localTagList = content.find_all(class_=re.compile('field-item even'))
        for x in range(len(localTagList)):
            if 'Website' in localTagList[x].get_text() and len(localTagList[x].get_text()) == 7:
                sites.append(localTagList[x + 1].get_text().replace(' ',''))
                break
        count += 1
        if count % (len(tagList) / 25):
            print('#', end='')
    print('|\nSites loaded!')
    return sites
main()
