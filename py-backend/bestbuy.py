#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Oct 15 00:15:22 2019

@author: wesley
"""
from selenium import webdriver
import codecs
import sys
numset = {'0','1','2','3','4','5','6','7','8','9'}

url='https://www.bestbuy.com/site/searchpage.jsp?st='
key=sys.argv[1]+'+'+sys.argv[2]
chrome_options = webdriver.ChromeOptions()
chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
chrome_options.add_arguement("--headless")
chrome_options.add_arguement("--disable-dev-shm-usage")
chrome-options.add_arguement("--no-sandbox")

driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER PATH", chrome_options = chrome_options))
driver.get(url+key)

pageNum=1 # number of pages to collect

fw=codecs.open('bestbuy.txt','w',encoding='utf8')
itemList = []

for p in range(1,pageNum+1): # for each page 
    
    #print ('page',p)
    html=None

    if p==1: 
        pageLink=url+key # url for page 1
        #print('pageLink,', pageLink)
    else: pageLink=url+'cp='+str(p)+'st='+key # make the page url
		
    items=driver.find_elements_by_css_selector("[class=sku-item]")
  
    for item in items:
     
        name, image, price, sale, link ='NA', 'NA', '', 'NA', 'NA' # initialize critic and text 
        mo,sale2='NA','NA'
        mo2='NA'
        try:         
            nameChunk=item.find_element_by_css_selector("[class*=sku-title]")
            if nameChunk: 
                name=nameChunk.text.strip()#.encode('ascii','ignore')
                url = nameChunk.find_element_by_tag_name("a").get_attribute('href')
                
             
        except:
            name='NA'
            #print ('no name')
            
        try:          
            imageChunk=item.find_element_by_tag_name("img")
            if imageChunk: 
                image=imageChunk.get_attribute('src')#.encode('ascii','ignore')   
        except:
            image='NA'
            #print ('no image')
        
        try:          
            priceChunk=item.find_element_by_css_selector("[class$=priceView-customer-price]").text
            if priceChunk: 
                for char in priceChunk:
                    if char == '\n': break;
                    price+=char
                #price=priceChunk.strip().replace('\n','')#.encode('ascii','ignore')   
            price = price.replace('$','')
        except:
            price='NA'
            #print ('no price')
        
        try:
            mo=item.find_element_by_css_selector("[class=priceView-subscription-units]").text
        except:
            mo=''

        try:          
            sale=item.find_element_by_css_selector("[class=pricing-price__regular-price]").text
            sale = sale.replace('Was $','')
            sale = sale.replace('Reg $','')
        except:
            try:
                sale2tmp=item.find_element_by_css_selector("[class$=priceView-previous-price]")
                sale2=sale2tmp.find_element_by_css_selector("[class=sr-only]").text
                #print('sale2',sale2.replace('\n',''))
                sale2=sale2.replace('The previous price for this item was $','')
            except:
                sale2='NA'
                #print('no sale')

        try: 
            sale2tmp=item.find_element_by_css_selector("[class$=priceView-previous-price]")
            mo2=sale2tmp.find_element_by_css_selector("[class=priceView-subscription-units]").text
        except:
            mo2=''

        itemList.append({'name':name, 'price':price, 'image': image})

        if sale2 !='NA': sale=sale2
       # print(str(len(mo))+'|'+str(len(mo2)))
        if len(mo) != 0:
            month = item.find_element_by_css_selector("[class=priceView-price-disclaimer__activation]").text
            tmp = ''
            for char in month:
                if char ==';': break
                if not char in numset: continue
                tmp+=char
            month=tmp
            #print(month)
            if len(month)!=0: 
                if price != 'NA': 
                    price2=float(price)*int(month)
                    price=price2
                if sale != 'NA': 
                    sale2=float(sale)*int(month)
                    sale=sale2
        
        #print(name + '\t' + sale+ '\t' + price + '\t' + str(url) + '\t' + image + '\n')
        if sale == 'NA':
            fw.write(name + '\t' + str(price) + '\t' + str(sale) + '\t' + url + '\t' + image + '\n') # write to file 
        else:
            fw.write(name + '\t' + str(sale) + '\t' + str(price) + '\t' + url + '\t' + image + '\n') 
		
    

fw.close()
driver.quit()
