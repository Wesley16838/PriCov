from selenium import webdriver
import codecs
import sys 
import time
import re

print('in ebay.py!')
print(sys.argv[1]+'+'+sys.argv[2])
url='https://www.ebay.com/sch/i.html?_nkw='+sys.argv[1]+'+'+sys.argv[2]

#open the browser and visit the url
chrome_options = webdriver.ChromeOptions()
chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
chrome_options.add_arguement("--headless")
chrome_options.add_arguement("--disable-dev-shm-usage")
chrome-options.add_arguement("--no-sandbox")

driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER PATH", chrome_options = chrome_options))
driver.get(url)

#time.sleep(5)
#driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

fw=codecs.open('ebay.txt','w',encoding='utf8')
data = driver.find_elements_by_css_selector('[class^=s-item__wrapper]')

for item in data:
    title,url,price,sale,img='NA','NA','NA','NA','NA'
    
    try:
        titletmp = item.find_element_by_css_selector('[class=s-item__title]')
        title = titletmp.text
    except:
        try:
            titletmp = item.find_element_by_css_selector('[class$=s-item__title--has-tags]')
            title = titletmp.text
        except:
            title='NA'
            
    try:
        urltmp = item.find_element_by_css_selector('[class=s-item__link]')
        url = urltmp.get_attribute('href')
    except:
        url='NA'
        
    try:
        pricetmp = item.find_element_by_css_selector('[class=s-item__price]')
        price = pricetmp.text
        if 'to' in price: continue
        price = price.replace('$','')
    except:
        price = 'NA'
    
    try:
        saletmp = item.find_element_by_css_selector('[class=s-item__trending-price]')
        sale = re.sub('[^0-9,.]','',saletmp.text)
    except:
        sale = 'NA'
        
    try:
        img = item.find_element_by_tag_name("img").get_attribute('src')
    except:
        img = 'NA'
    
    try:
        if sale=='NA':
            print(title + '\t' + price + '\t' + sale +'\t' + url + '\t' + img)
            fw.write(title + '\t' + price + '\t' + sale +'\t' + url + '\t' + img + '\n')
        else:
            print(title + '\t' + sale + '\t' + price +'\t' + url + '\t' + img)
            fw.write(title + '\t' + sale + '\t' + price +'\t' + url + '\t' + img + '\n')
    except:
        print('something worng')
fw.close()
driver.quit()