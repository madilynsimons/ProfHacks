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
    page = requests.get(URL)
    return BeautifulSoup(page.content, 'html.parser')
    
def import_sites():
    content = get_page_content(fakeNews)

    return content.find_all(href=re.compile('fake-news-source'))

def get_links(tagList):
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
