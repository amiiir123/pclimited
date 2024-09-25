
fetch('/menus_footer').then(response => response.json()).then(data=>{
    
    const mydataMenu = data.menu
    const Footer = data.footer[0]
    const socialdata = data.footer[0].social


    const containerMenu = document.getElementById("menu-builder")
    const socialMed = document.getElementById("socialMedia")
    
    
    function  socialMedia(social){
        socialMed.innerHTML = `
<a href="${social.facebook}">
                <i class="fa fa-facebook"></i>
            </a>
            <a href="${social.x}">
                <i class="fa fa-twitter"></i>
            </a>
            <a href="${social.instagram}">
                <i class="fa fa-instagram"></i>
            </a>
            <a href="${social.linkedin}">
                <i class="fa fa-linkedin"></i>
            </a>
            <a href="${social.github}">
                <i class="fa fa-github"></i>
            </a>
        
        `
        

    
    
    
    }
    async function  footerConfig(data){
        document.getElementById('footer').innerHTML = `
            <div class="container">
        <div class="col-md-3 col-sm-6 col-xs-12">
            <h2>About us</h2>
            <p>${data.description} </p>
            </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
            <h2>Opening Hours</h2>
            <ul>
            <li>Mon-Thu: 8:00 - 17:00</li>
                <li>Fri: 8:00 - 19:00</li>
                <li>Sat: 11:00 - 14:00</li>
                <li>Sun: Closed</li>
                <li>Sat: Closed</li>
            </ul>
            </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
        <h2>Pages</h2>
        <ul id="footer-pages">
        
            </ul>
            </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
            <h2>Contact info</h2>
            <ul class="footer_icon">
                <li>
                <i class="fa fa-map-marker">
                </i>${data.companyLocation}</li>
                <li><i class="fa fa-phone"></i>Phone: ${data.phoneNumber}</li>
                <li><i class="fa fa-envelope-o"></i>E-mail: ${data.systemEmail}</li>
            </ul>
        </div>
</div>

        
        `
        

    
    
    
    }
     function  menuPagesConfig(menus,container,test){
        
         menus.forEach(page => {
            if(test && (page.title == 'Login' || page.title == 'sign up') ){

            }else{

                const li = document.createElement('li');
                li.innerHTML =`<a href="${page.link}">${page.title}</a>`
                container.appendChild(li)
            }

           
        });
        
    
    
    
    }


    function customPlugin(ID) {
        if(ID.googleAnalyticsId){
            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${ID.googleAnalyticsId}`;
            
            document.head.appendChild(script1);
        
            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', '${ID.googleAnalyticsId}');
            `;
            document.head.appendChild(script2);
        }
        if(ID.metaApiTrack){
            const metaPixelScript = document.createElement('script');
            metaPixelScript.innerHTML = `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${ID.metaApiTrack}'); 
                fbq('track', 'PageView');
            `;
            document.head.appendChild(metaPixelScript);
            const noscript = document.createElement('noscript');
            noscript.innerHTML = `
                <img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=${ID.metaApiTrack}&ev=PageView&noscript=1"/>
            `;
            document.body.appendChild(noscript);
        
        }

    }

    

    customPlugin(Footer);
    
    footerConfig(Footer)
    menuPagesConfig(mydataMenu,containerMenu,false)
    const footerPages = document.getElementById("footer-pages")
    menuPagesConfig(mydataMenu,footerPages,true)
    socialMedia(socialdata)









})
