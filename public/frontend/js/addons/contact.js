fetch(`/contact_Data`,{
    method:'GET'
})
.then(response=>response.json())
.then((data) => {
    
    const company = data.comInfo[0];

    document.getElementById('infoContainer').innerHTML = `
    <div class=row>
            <div class="col-xs-12 col-md-4 col-sx-4">
                <div class="clearfix contact-box">
                    <div class=contact-icon>
                        <i class=icon-map>

                        </i>
                    </div>
                    <div class=contact-info>
                        <h4>Our Address</h4>
                        <p>${company.companyLocation}
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-md-4 col-sx-4">
                <div class="clearfix contact-box">
                    <div class=contact-icon>
                        <i class=icon-smartphone2></i>
                    </div>
                    <div class=contact-info>
                        <h4>Phone & Email</h4>
                        <p>${company.phoneNumber}<br>${company.systemEmail}
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-md-4 col-sx-4">
                <div class="clearfix contact-box">
                    <div class=contact-icon>
                        <i class=icon-clock>

                        </i>
                    </div>
                    <div class=contact-info>
                        <h4>Working Hours</h4>
                        <p>Time: Tusday-Monday<br>9:00am - 6:00pm
                    </div>
                </div>
            </div>
        </div>
    
    
    
    `
    




})