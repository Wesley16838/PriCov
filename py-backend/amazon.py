from selenium import webdriver
import codecs
import sys 

print('in py!')
print(sys.argv[1])
url='https://www.amazon.com/s?k='+sys.argv[1]+'+'+sys.argv[2]
#url='https://www.amazon.com/s?k='+'apple'+'+'+'phone'

#open the browser and visit the url
chrome_options = webdriver.ChromeOptions()
chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
chrome_options.add_arguement("--headless")
chrome_options.add_arguement("--disable-dev-shm-usage")
chrome-options.add_arguement("--no-sandbox")

driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER PATH", chrome_options = chrome_options))
driver.get(url)

#find all elements with a class that ends in 'tweet-text'
tweets=driver.find_elements_by_css_selector("[class*=s-result-item]")#*:contains
#print(len(tweets))
#write the tweets to a file
fw=codecs.open('amazon.txt','w',encoding='utf8')
for tweet in tweets:
    #print('asin',tweet.get_attribute('data-asin')=='',tweet.get_attribute('data-asin'))
    if tweet.get_attribute('data-asin')=='':
        tweets2=tweet.find_elements_by_css_selector("[class*=s-inner-result-item]")
        #print(len(tweets2))
        if(len(tweets2)!=0):
            for tweet2 in tweets2:
                #print('aria-hidden',tweet2.get_attribute('aria-hidden'))
                title2,integer2,decimal2,pic2,sale2,link2='NA','NA','NA','NA','NA','NA'
                
                try: title2=tweet2.find_element_by_css_selector("[class$=a-text-normal]").text
                except: title2='NA'
                
                try: integer2=tweet2.find_element_by_css_selector("[class=a-price-whole]").text
                except: integer2='NA'
                
                try: decimal2=tweet2.find_element_by_css_selector("[class=a-price-fraction]").text
                except: decimal2='NA'
                
                try: sale2=tweet2.find_element_by_css_selector("[class$=a-text-price]").text
                except: sale2='NA'
                #print('sale2:',sale2)
                if len(sale2)==0:
                    tweet3=tweet2.find_element_by_css_selector("[class$=a-text-price]")
                    sale2=tweet2.find_element_by_css_selector("[class=a-offscreen]")
                    #print('sale2 again:',sale2)
                    
                try: pic2=tweet2.find_element_by_tag_name("img").get_attribute('src')
                except: pic2='NA'
                
                try: link2 = tweet.find_element_by_css_selector("[class=a-link-normal]").get_attribute('href')
                except: link2='NA'
                #print('link2',link2)
                
                #fw.write(title2.replace('\n',' ')+'\t'+str(integer2)+'.'+str(decimal2)+'\t'+sale2+'\t'+link2+'\t'+pic2+'\n')
            
    else:
        title,integer,decimal,pic,sale,link='NA','NA','NA','NA','NA','NA'
        skip='NA'
        
        try:
            skip = tweet.find_element_by_css_selector("[class$=a-color-secondary]").text
        except: skip='NA'
        print(skip)
        if skip == 'Sponsored': continue
    
        try: title=tweet.find_element_by_css_selector("[class$=a-text-normal]").text#$:end with
        except: title='NA'    
    
        try: integer=tweet.find_element_by_css_selector("[class=a-price-whole]").text
        except: #integer=tweet.find_element_by_css_selector("[class=a-color-base]").text
            integer='NA'
        
        try: decimal=tweet.find_element_by_css_selector("[class=a-price-fraction]").text
        except: decimal='NA'
            
        try: sale=tweet.find_element_by_css_selector("[class$=a-text-price]").text
        except: sale='NA'
        #print('sale:',sale)
        
        try: pic=tweet.find_element_by_tag_name("img").get_attribute('src')
        except: pic='NA'
        
        try: link = tweet.find_element_by_css_selector("[class=a-link-normal]").get_attribute('href')
        except: link='NA'
        
        fw.write(title.replace('\n',' ')+'\t'+str(integer)+'.'+str(decimal)+'\t'+sale+'\t'+link+'\t'+pic+'\n')
        #print(title.replace('\n',' ')+'\t'+str(integer)+'.'+str(decimal)+'\t'+pic+'\n')
        #print('link',link)

fw.close()
driver.quit()#close the browser
