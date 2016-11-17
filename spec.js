// spec.js
//-----------------Pre-Reqs------------------------------------------
var hotkeys = require("protractor-hotkeys");

function Transaction(generic, exp, qty, location){
  this.generic = generic
  this.exp = exp
  this.qty = qty
  this.location = location
}

var selectDropdownbyNum = function ( element, optionNum ) {
    if (optionNum){
      var options = element.all(by.tagName('option'))   
        .then(function(options){
          options[optionNum].click();
        });
    }
  };


//----------------Where the Magic Happens----------------------------

describe('SIRUM Website V2', function() {
  
  it('should let me login', function() {
    browser.loadAndWaitForAureliaPage('http://localhost:9000');
    expect(browser.getTitle()).toEqual('Login | SIRUM'); //check that it's the right page
    //Enter the correct email, here it's omar@sirum.org with password
    element(by.name('email')).element(by.id('inputfield')).clear()
    expect(element(by.name('email')).element(by.id('inputfield')).getAttribute('value')).toBe('')
    element(by.name('email')).element(by.id('inputfield')).sendKeys("omar@sirum.org")
    expect(element(by.name('email')).element(by.id('inputfield')).getAttribute('value')).toBe('omar@sirum.org')
    //Then enter the password
    element(by.name('password')).element(by.id('inputfield')).sendKeys("password")
    element(by.name('button')).click()  //click the login button
    browser.sleep(20000)  //wait for it to load
    expect(browser.getTitle()).toEqual('Shipments | SIRUM') //So it's logged in
  })

  it('should let me create a new shipment called "AUTO-TEST" from the first possible donor', function(){
    element(by.name('newShipmentButton')).click()
    element(by.name('tracking')).element(by.id('inputfield')).sendKeys("AUTO-TEST")
    selectDropdownbyNum(element(by.name("from-option")),1) //picks the first option
    element(by.name("create-button")).click()
    browser.sleep(4000)
  })
  
  it('should let me switch to another shipment', function(){
    browser.refresh()
    browser.sleep(5000)
    element(by.css('#existing-shipment:nth-child(5)')).click() //nth-child as way of picking something from a list
    browser.sleep(5000)
  })
  
  it('should let me add an ordered drug correctly to the shipment',function(){
    element(by.name('searchbar')).element(by.id('inputfield')).sendKeys("00230313")
    browser.sleep(6000)
    hotkeys.trigger('enter', {targetElement: $('#searchbar #inputfield')})
    browser.sleep(1500)
    element(by.name('exp-field')).element(by.id('inputfield')).sendKeys("8/17")
    element(by.name('exp-field')).element(by.id('inputfield')).sendKeys(protractor.Key.ENTER)
    element(by.name('qty-field')).element(by.id('inputfield')).sendKeys("31")
    element(by.name('qty-field')).element(by.id('inputfield')).sendKeys(protractor.Key.ENTER)
    browser.sleep(4000)
    expect(element(by.name("snackbar")).element(by.id('text')).getText()).toBe('Drug is ordered') //how we can read snackbar
   // element(by.name('box-field')).element(by.id('inputfield')).sendKeys("A111")
   // element(by.name('box-field')).element(by.id('inputfield')).sendKeys(protractor.Key.ENTER)
  })

  it('should let me duplicate with a double-enter, and the exp field should have auto-populate and +/- functionality',function(){
    element(by.name('searchbar')).element(by.id('inputfield')).sendKeys(protractor.Key.ENTER)
    browser.sleep(4000)
    element(by.name('exp-field')).element(by.id('inputfield')).sendKeys("+")
    element(by.name('exp-field')).element(by.id('inputfield')).sendKeys(protractor.Key.ENTER)
    expect(element(by.name('exp-field')).element(by.id('inputfield')).getAttribute('value')).toBe('09/17')

    element(by.name('qty-field')).element(by.id('inputfield')).sendKeys("1")
    element(by.name('qty-field')).element(by.id('inputfield')).sendKeys(protractor.Key.ENTER)
    browser.sleep(4000)
    //element(by.name('box-field')).element(by.id('inputfield')).sendKeys(protractor.Key.ENTER)
  })
  
  it('should tell me if it did not find the NDC',function(){
    browser.sleep(4000)
    element(by.name('searchbar')).element(by.id('inputfield')).sendKeys("This is not a drug")
    element(by.name('searchbar')).element(by.id('inputfield')).sendKeys(protractor.Key.ENTER)
    browser.sleep(2000)
    expect(element(by.name("snackbar")).element(by.id('text')).getText()).toBe('Cannot find drug matching this search') //how we can read snackbar
  })

  it('should let me delete with a zero quantity', function(){
    element(by.name('qty-field')).element(by.id('inputfield')).clear()
    element(by.name('qty-field')).element(by.id('inputfield')).sendKeys("0")
    browser.sleep(3000)
  })

//Related to test below, incomplete
/*var generateShipmentArray = function () {
  for(var i = 0; i < 1; i++){

  }

};*/

//This test is a work in progress
  it('should let me create an object encapsulating the shipment',function(){
    browser.sleep(4000)
   
    var generic = ""
    var exp = ""
    var qty = ""
    var location = ""

    var index = 1

    var generic_query = '#generic-field:nth-child(' + index + ')'
    var exp_query = '*[name="exp-field"]:nth-child(' + index + ')'
    var qty_query = '*[name="qty-field"]:nth-child(' + index + ')'
    var box_query = '*[name="box-field"]:nth-child(' + index + ')'
    expect(element(by.css(generic_query)).getText()).toBe("YOYOYO")
    
    var p1 = element(by.css(generic_query)).getText().then(res => { 
    //by.name('generic-field')).getText().then(res => {
      generic = res
    })

    var p2 = element(by.css(exp_query)).element(by.id('inputfield')).getAttribute('value').then(res =>{ 
      exp = res
    })

    var p3 = element(by.css(qty_query)).element(by.id('inputfield')).getAttribute('value').then(res => {
      qty = res
    })

    var p4 = element(by.css(box_query)).element(by.id('inputfield')).getAttribute('value').then(res => {
      location = res
    })

    Promise.all([p1,p2,p3]).then(_=>{
      var transaction_0 = new Transaction(generic, exp, qty, location)
      console.log(transaction_0)
    })

  })



  //----------Tests still to write-------------------
  //erros on invalid shipment data
  //import/export available --> use csvtojson to read the source file, import it, check if its all there, export it, and check
  //can be moved between shipments, can be saved to inventory. checkboxes work.

});