(function() {
    /**
     * Created by dvircn on 22/10/14.
     */
    var BAppGenerator = Class({
        $singleton: true,
        generate: function(){
            var builder = new CBuilderObjects();
            // Set Prefs.
            BAppGenerator.setPrefs(builder);
            // Add Plugins.
            BAppGenerator.setPlugins(builder);
            // Set Push Data.
            BAppGenerator.setPushData(builder);
            // Add Links
            BAppGenerator.setJSLinks(builder);
            BAppGenerator.setCSSLinks(builder);
            BAppGenerator.setCustomCSS(builder);
            BAppGenerator.setCustomJS(builder);

            // Start build app.
            builder.create('AppContainer','app-container').childs(['side-menu','main-view'])
                .design({
                    direction: 'rtl',
                    inline: "font-family:'Alef Hebrew','sans-serif','HelveticaNeue-Light','HelveticaNeue',Helvetica,Arial"
                });
            builder.create('SideMenu','side-menu').sideMenuWidth(100)
                .sideMenuRightContainer('side-menu-right-container');
            builder.addData('footerSize',0);
            builder.addData('headerSize',70);

            builder.addData('navigation',[
                {data: {showTime:600,color:CColor('GreenH',11),    icon:'phone94',             text: 'התקשרו אלינו'  , phone: '#globals.business_info.phone'   } },
                {data: {showTime:700,color:CColor('TealC',10),         icon:'dress1',             text: 'המוצרים שלנו',   link: 'categories'} },
                {data: {showTime:800,color:CColor('PurpleH',11),  icon:'map65',               text: 'נווטו אלינו',    address: '#globals.business_info.address'} },
                {data: {showTime:900,color:CColor('BlueC',12),      icon:'facebook33',          text: 'עמוד הפייסבוק',  facebookPage: '#globals.business_info.facebookID' } },
                {data: {showTime:1000,color:CColor('RedC',7),          icon:'information43',       text: 'אודותינו',       link: 'about'       } }

            ]);
            builder.addData('side-navigation',[
                {data: {color:CColor('PinkG',10),    icon:'home48',             link:'/'   } },
                {data: {color:CColor('GreenH',11),    icon:'phone94',             text: 'התקשרו אלינו'  , phone: '#globals.business_info.phone'   } },
                {data: {color:CColor('TealC',10),         icon:'dress1',             text: 'המוצרים שלנו',   link: 'categories'} },
                {data: {color:CColor('PurpleH',11),  icon:'map65',               text: 'נווטו אלינו',    address: '#globals.business_info.address'} },
                {data: {color:CColor('BlueC',12),      icon:'facebook33',          text: 'עמוד הפייסבוק',  facebookPage: '#globals.business_info.facebookID' } },
                {data: {color:CColor('RedC',7),          icon:'information43',       text: 'אודותינו',       link: 'about'       } }

            ]);
            builder.create('SideMenuContainer','side-menu-right-container').childs(['right-menu'])
                .design({bgColor: CColor('White')});
            builder.addDesign('right-menu-button',{
                boxSizing:'borderBox',textAlign:'center',height:90, widthXS: 12,
                fontSize:16,color: CColor('Gray',1), round: 0,fontWeight:'bold',
                active: { bgColor:CColor('Gray',17),color: CColor('White') }
            });
            builder.create('Template','right-menu')
                .templateObject(
                    co('Button')
                        .icon('#this.data.icon',50,'',CColor('White'))
                        .sideMenuSwitch('right')
                        .design({parents:['right-menu-button'],
                            bgColor:'#this.data.color',
                            activeRemove: {bgColor:'#this.data.color'}
                        })
//                    .text('#this.data.text')
                        .link('#this.data.link')
                        .phoneCall('#this.data.phone')
                        .openNavigationApp('#this.data.address')
                        .openFacebookPageOrProfile('#this.data.facebookPage')
                )
                .templateData('#globals.side-navigation');
            builder.create('MainView','main-view').childs(['header','content'])
                .design({inline: '-webkit-box-shadow: 2px 0px 16px -2px rgba(0, 0, 0, 0.6);-moz-box-shadow: 2px 0px 16px -2px rgba(0, 0, 0, 0.6);box-shadow: 2px 0px 16px -2px rgba(0, 0, 0, 0.6);'});
            builder.create('Header','header')
                .headerLeft(['header-button-back'])
                .headerRight(['header-button-menu'])
                .design({
                    bgColor:CColor('TealC',10),color: CColor('White'),fontWeight:'bold'
                })
                .headerTitleDesign({
                    fontSize: 18
                });
            //Add Design.
            builder.addDesign('header-button',{active: { bgColor:CColor('TealC',13) }  });
            builder.create('Button','header-button-menu')
                .design({parents:['header-button']}).sideMenuSwitch('right')
                .icon('menu24',38,'',CColor('White'));
            builder.create('Button','header-button-back')
                .design({parents:['header-button']})
                .icon('left46',38,'',CColor('White')).backButton();
//        builder.create('Footer','footer').child('footer-message')
//            .design({bgColor:{color:'Pink',level:6}});
//        builder.create('Label','footer-message').text('פותח ע"י Codletech')
//            .design({color:CColor('White'),textAlign:'center',fontWeight:'normal'});
            builder.create('Content','content')
                .child('page-main')
                .child('page-about')
                .child('page-categories')
                .child('page-products');

            BAppGenerator.createPageMain(builder);
            BAppGenerator.createPageAbout(builder);
            BAppGenerator.createPageCategories(builder);
            BAppGenerator.createPageProducts(builder);

            return builder.build();
        },
        setPrefs: function(builder){
            builder.setAppPref('appName','Tester App');
            builder.setAppPref('appUri','net.codletech.apps.tester');
            builder.setAppPref('appDescription','');
            builder.setAppPref('icons',{
                defaultIcon:'http://i57.tinypic.com/6qbrtj.jpg'
            });
            builder.setAppPref('author','Dvir Cohen');
            builder.setAppPref('author','Dvir Cohen');
            builder.setAppPref('keywords','Codletech,Codletech Apps,חנות בגדים,את,את - מירית הרשקוביץ');
            builder.setAppPref('mail','atmirit@gmail.com');
            builder.setAppPref('phone','098857822');
            builder.setAppPref('supportUrl','https://www.facebook.com/atmirit');
            builder.setAppPref('appFeatures',[]);
            builder.setAppPref('appPreferences',[
                {name: 'disallowOverscroll',value:'true'},
                {name: 'DisallowOverscroll',value:'true'},
                {name: 'webviewbounce',value:'false'}
            ]);
        },
        setPlugins: function(builder){
            builder.addPlugin('org.apache.cordova.device');
            builder.addPlugin('org.apache.cordova.splashscreen');
            builder.addPlugin('nl.x-services.plugins.socialsharing');
            builder.addPlugin('com.pushapps.phonegap');
            builder.addPlugin('com.ohh2ahh.plugins.appavailability');
            builder.addPlugin('de.appplant.cordova.plugin.email-composer');
            builder.addPlugin('org.apache.cordova.inappbrowser');
            builder.addPlugin('com.phonegap.plugin.statusbar');
        },
        setPushData: function(builder){
            builder.setAppPref('pushData',{
                pushToken:'37b3010b-c31b-4e81-9158-db6a4901a346',
                pushServerToken: '513b8cd7-3eee-4e27-81e4-8e1f106e951b'
            });
        },
        setJSLinks: function(builder){
            builder.setAppPref('jsLinks',[
            ]);
        },
        setCSSLinks: function(builder){
            builder.setAppPref('cssLinks',[
                'http://fonts.googleapis.com/earlyaccess/alefhebrew.css'
            ]);
        },
        setCustomCSS: function(builder){
            builder.setAppPref('cssCustom',[
            ]);
        },
        setCustomJS: function(builder){
            builder.setAppPref('jsCustom',[
            ]);
        },
        createPageMain: function (builder) {
            // Main Page
            builder.create('Page', 'page-main')
                .page('', '#globals.business_info.name', function () {
                } /* Optional On Page Load */)
                .child('page-main-logo')
                .child('page-main-about-description')
                .child('page-main-buttons')
                .onShowAnimation(
                    ['page-main-logo','page-main-about-description'],
                    ['moveToBottomFade2','moveToLeftFade2'],
                    [0,300]
                );
            builder.create('Image', 'page-main-logo')
                .imageSource('#globals.business_info.thumbnail')
                .design({
                    width:'100%',maxWidth:500,maxHeight:250,
                    borderColor: CColor('TealC',10),border:{bottom:6}
                });
            builder.create('Label', 'page-main-about-description')
                .text('#globals.business_info.about')
                .design({
                    width: '95%', maxWidth:450, color: CColor('Gray', 16),
                    fontWeight: 'bold', textAlign:'center', margin:'centered',
                    marginTop:5, fontSize:18,lineHeight: 30
                });
            builder.addDesign('page-main-button',{
                width: 70, height: 70, textAlign: 'center', marginBottom: 10,
                marginTop: 10, round: 'circle', paddingLeft:3, margin:'centered',
                inline: 'box-shadow: 2px 2px 3px #444444;'+
                    '-webkit-box-shadow: 2px 2px 3px #444444;'+
                    '-moz-box-shadow: 2px 2px 3px #444444;',
                active: { bgColor:CColor('Gray',17),color: CColor('White') }
            });
            builder.create('Template','page-main-buttons')
                .templateObject(
                    co('Button')
                        .icon('#this.data.icon',40,'',CColor('White'))
                        .design({parents:['page-main-button'],
                            bgColor:'#this.data.color',
                            activeRemove: {bgColor:'#this.data.color'}
                        })
                        .link('#this.data.link')
                        .phoneCall('#this.data.phone')
                        .openNavigationApp('#this.data.address')
                        .openFacebookPageOrProfile('#this.data.facebookPage')
                        .onShowSelfAnimation('rotateUnfoldBottom','#this.data.showTime')
                )
                .templateData('#globals.navigation')
                .templateContainerDesign({
                    widthXS: 4
                })
                .design({
                    marginTop:10
                });

        },
        createPageAbout: function (builder) {
            builder.addDesign('design-about-icon',{
                border:{all:1},borderColor:CColor('TealC',10), round:'circle',
                width: 65, height: 65, textAlign: 'center',marginLeft: 12,
                boxSizing:'borderBox'
            });
            builder.addDesign('design-about-value',{
                paddingRight:6,boxSizing:'borderBox',textAlign:'right',height:75, widthXS: 11,
                fontSize:16,color: CColor('Gray',17), fontWeight:'bold',
                marginBottom:12,marginTop:12, paddingTop:5, paddingBottom:5,
                lineHeight: 65,
                active: { bgColor:CColor('TealA',12),color:CColor('White') }
            });
            // About Page
            builder.create('Page', 'page-about')
                .page('about', 'אודותינו')
                .childs([
                    'page-about-logo',
                    'page-about-value-phone',
                    'page-about-value-address',
                    'page-about-value-facebook',
                    'page-about-value-mail',
                    'page-about-value-codletech'
                ]).onShowAnimation(
                    [   'page-about-logo',
                        'page-about-value-phone',
                        'page-about-value-address',
                        'page-about-value-facebook',
                        'page-about-value-mail',
                        'page-about-value-codletech'],
                    ['moveToBottomFade2','moveToLeftFade2',
                        'moveToLeftFade2','moveToLeftFade2',
                        'moveToLeftFade2','moveToLeftFade2'],
                    300);
            builder.create('StaticMap', 'page-about-logo')
                .staticMapData({
                    center: '#globals.business_info.address',
                    marker:{color:'green'}
                })
                .design({
                    width:'100%',maxWidth:500,maxHeight:250,
                    borderColor: CColor('TealC',10),border:{bottom:6}
                });
            builder.create('Button', 'page-about-value-phone').text('#globals.business_info.phone')
                .phoneCall('09-885-7822').iconLeft('left46',34,CColor('TealC',10))
                .iconRight('phone94',40,CColor('TealC',10),{ parents:['design-about-icon']})
                .design({ parents:['design-about-value']});
            builder.create('Button', 'page-about-value-address').text('#globals.business_info.address')
                .openNavigationApp('#globals.business_info.address').iconLeft('left46',34,CColor('TealC',10))
                .iconRight('map65',40,CColor('TealC',10),{ parents:['design-about-icon']})
                .design({ parents:['design-about-value']});
            builder.create('Button', 'page-about-value-facebook').text('עמוד הפייסבוק שלנו')
                .openFacebookPageOrProfile('#globals.business_info.facebookID').iconLeft('left46',34,CColor('TealC',10))
                .iconRight('facebook33',40,CColor('TealC',10),{ parents:['design-about-icon']})
                .design({ parents:['design-about-value']});
            builder.create('Button', 'page-about-value-mail').text('#globals.business_info.mail')
                .openMailTo('#globals.business_info.mail').iconLeft('left46',34,CColor('TealC',10))
                .iconRight('mail61',40,CColor('TealC',10),{ parents:['design-about-icon']})
                .design({ parents:['design-about-value']});
            builder.create('Button', 'page-about-value-codletech').text('פותח ע"י Codletech')
                .link('http://codletech.net').iconLeft('left46',34,CColor('TealC',10))
                .iconRight('cinch',40,CColor('TealC',10),{ parents:['design-about-icon']})
                .design({ parents:['design-about-value']});
        },
        createPageCategories: function (builder) {
            // Main Page
            builder.create('Page', 'page-categories')
                .page('categories', 'קטגוריות מוצרים', function () {
                } /* Optional On Page Load */)
                .child('page-categories-template');
            builder.create('Template','page-categories-template')
                .onShowAnimateChildren('scaleUpToBottom',40,0)
                .template('http://codletech.net/approducer/atmirit/api/getCustomData.php',
                true,{types:['products_groups'],single:true,
                    columns:['dataID','title','thumbnail']})
                .templateLoaderColor(CColor('TealC',10))
                .templatePullToRefresh()
                .templateRootObjects(['#/box'])
                .templateObjects([
                    co('Container','#/box')
                        .child('#/image').child('#/title')
                        .design({position: 'relative',width:'100%',height:90,cursor:'pointer',
                            active: {bgColor:CColor('TealC',10)}
                        })
                        .link('products',{id:'#.data.dataID',name:'#.data.title'}),
                    co('Button','#/title')
                        .design({
                            position:'absolute',top:10,left:100,height:70,
                            fontWeight:'bold',fontSize:18,color:CColor('Gray',17)
                        })
                        .text('#.data.title')
                        .link('products',{id:'#.data.dataID',name:'#.data.title'}),
                    co('Image', '#/image')
                        .design({
                            position:'absolute',top:10,left:10,
                            width:70,height:70,round:'circle'
                        })
                        .imageSource('#.data.thumbnail')
                        .link('products',{id:'#.data.dataID',name:'#.data.title'})
                ]);

        },
        createPageProducts: function (builder) {
            builder.create('TemplatePage', 'page-products')
                .page('products', '#.data.name',function(){ // OnLoad
                    var productsTemplate = CObjectsHandler.relativeObject(thisObject,'page-products-template');
                    var pObject = CObjectsHandler.object(productsTemplate || '');
                    if (!CUtils.isEmpty(pObject) && !CUtils.isEmpty(pObject.data.template))
                        CTemplator.load(productsTemplate,pObject.data.template.queryData||{},null,true);
                })
                .templateObject(
                    co('Template','#/page-products-template')
                        .onShowAnimateChildren('scaleUpToBottom',40,0)
                        .template('http://codletech.net/approducer/atmirit/api/getCustomData.php',
                        false,{types:['products_groups'],single:true,
                            columns:['products_group_list'],dataIDs:['##.data.id']})
                        .templateDataPrepareFunction(function(data){
                            if (CUtils.isEmpty(data))
                                return [];
                            data = _.toArray(data);
                            if (CUtils.isEmpty(data) || CUtils.isEmpty(data[0]) || CUtils.isEmpty(data[0]['products_group_list']))
                                return [];
                            return data[0]['products_group_list'];
                        })
                        .templateLoaderColor(CColor('TealC',10))
                        .templatePullToRefresh()
                        .templateRootObjects(['#/box'])
                        .templateObjects([
                            co('Container','#/box')
                                .child('#/image').child('#/title').child('#/share')
                                .design({width:'95%',margin:'centered',marginTop:10,marginBottom:3,
                                    inline: 'box-shadow: 0 1px #D9D9D9 inset, 0 1px 3px rgba(34, 25, 25, 0.4);'+
                                        '-webkit-box-shadow: 0 1px #D9D9D9 inset, 0 1px 3px rgba(34, 25, 25, 0.4);'+
                                        '-moz-box-shadow: 0 1px #D9D9D9 inset, 0 1px 3px rgba(34, 25, 25, 0.4);'
                                }),
                            co('Label','#/title')
                                .design({
                                    textAlign:'center',fontWeight:'bold',
                                    fontSize:15,color:CColor('Gray',17)
                                })
                                .text('#.data.name'),
                            co('Image', '#/image')
                                .design({
                                    margin:'centered',width:'100%'
                                })
                                .imageSource('#.data.image'),
                            co('Button','#/share')
                                .design({
                                    height:40,textAlign:'center',fontWeight:'bold',
                                    fontSize:15,color:CColor('TealC',10),marginTop:3,
                                    borderColor: CColor('Gray',2),border:{top:1},
                                    active: {bgColor:CColor('TealC',10),color:CColor('White')}
                                })
                                .icon('reply15',32,'center')
                                .shareImage('#.data.name','#.data.name','#.data.image')
                        ])
                );

        }


    });

    return BAppGenerator.generate();

})();
