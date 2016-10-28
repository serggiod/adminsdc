var basePath     = __dirname.replace('/scripts','');
var nodeModules  = basePath+'/node_modules';
var fileSystem   = require('fs');
var readline     = require('readline');
var angular      = {

    //Paths.
    path:{
        application:basePath+'/public/application/application.js',
        controllers:basePath+'/public/controllers',
        directives:basePath+'/public/directives',
        services:basePath+'/public/services',
        factories:basePath+'/public/factories',
        views:basePath+'/public/views',
        index:basePath+'/public/index.html'
    },
    

    // Interfase. 
    appName:(appname)=>{
        if(appname===undefined) angular.messages.errorAppName();
        else{

            file = angular.path.application;
            angular.common.fileRead(file,(e,d)=>{
                if(!e) angular.messages.errorAppName();
                else{
                    init    = d.indexOf("('") +2;
                    end     = d.indexOf("',");
                    oldname = d.substring(init,end);
                    value   = d.replace(oldname,appname);
                    
                    angular.common.fileWrite(file,value,(e)=>{
                        if(!e) angular.messages.errorAppName();
                        else{
                            
                            file = angular.path.index;
                            angular.common.fileRead(file,(e,d)=>{
                                if(!e) angular.messages.errorAppName();
                                else{
                                    init    = d.indexOf('ng-app="') +8;
                                    end     = d.indexOf('">');
                                    oldname = d.substring(init,end);
                                    value   = d.replace(oldname,appname); 
                                    
                                    angular.common.fileWrite(file,value,(e)=>{
                                        if(e) angular.messages.successAppName();
                                        else  angular.messages.errorAppName();
                                    });
                                }
                            });

                        }
                    })
                }
            });
        }
    },

    addRoute:(route,params)=>{
        if(route===undefined) angular.messages.errorWriteRoute();
        else{
            angular.common.fileRead(angular.path.application,(e,d)=>{
                if(e){
                    init = d.indexOf("('") +2;
                    end  = d.indexOf("',");
                    var nameapp = d.substring(init,end);
                    file = angular.path.controllers+'/'+route+'Controller.js';
                    angular.common.fileExist(file,(e)=>{
                        if(e) angular.messages.errorWriteRoute();
                        else{
                            angular.common.fileRead(angular.path.application,(e,d)=>{
                                if(!e) angular.messages.errorWriteRoute();
                                else{
                                    var nameroute      = route;
                                    var namecontroller = route+'Controller';
                                    var nameview       = route+'View';
                                    if(params!=undefined) nameroute += '/'+params;
                                    var file     = angular.path.application;
                                    var value    = d.replace('\n\t\t\t//addroute.',angular.templates.route(nameroute,namecontroller,nameview));
                                    angular.common.fileWrite(file,value,(e)=>{
                                        if(!e) angular.messages.errorWriteRoute();
                                        else{
                                            var file  = angular.path.controllers+'/'+namecontroller+'.js';
                                            var value = angular.templates.constroller(nameapp,namecontroller);
                                            angular.common.fileWrite(file,value,(e)=>{
                                                if(!e) angular.messages.errorWriteRoute();
                                                else{

                                                    file  = angular.path.views+'/'+nameview+'.html';
                                                    value = angular.templates.view(namecontroller);
                                                    angular.common.fileWrite(file,value,(e)=>{
                                                        if(!e) angular.messages.errorWriteRoute();
                                                        else{

                                                            file = angular.path.index;
                                                            angular.common.fileRead(file,(e,d)=>{
                                                                if(!e) angular.messages.errorWriteRoute();
                                                                else{

                                                                    template = angular.templates.script(namecontroller+'.js');
                                                                    value    = d.replace('\n\t\t<!-- addcontroller -->',template);
                                                                    angular.common.fileWrite(file,value,(e)=>{
                                                                        if(e) angular.messages.successWriteRoute();
                                                                        else angular.messages.errorWriteRoute();
                                                                    });

                                                                }
                                                            });

                                                        }
                                                    });

                                                }

                                            });
                                        }
                                    })
                                }
                            })
                        }
                    });
                }
            });
        }
    },

    addController:(name)=>{
        if(name===undefined) angular.messages.errorAddController();
        else{
            angular.common.addController(name,()=>{});
        }
    },

    addView:(name)=>{
        if(name===undefined) angular.messages.errorAddView();
        else{
            angular.common.addView(name,()=>{});
        }
    },

    addNgModule:(name,injector)=>{
        if(name===undefined || injector===undefined) angular.messages.errorAddNgModule();
        else{
            angular.common.addNgModule(name,injector,()=>{});
        }
    },

    addDirective:(name)=>{
        if(name===undefined) angular.messages.errorAddDirective();
        else{
            angular.common.addDirective(name,()=>{});
        }
    },

    addFactory:(name)=>{
        if(name===undefined) angular.messages.errorAddFactory();
        else{
            angular.common.addFactory(name,()=>{});
        }
    },

    addService:(name)=>{
        if(name===undefined) angular.messages.errorAddService();
        else{
            angular.common.addService(name,()=>{});
        }
    },

    // Metodos comunes.
    common:{

        fileExist:(file,callback)=>{
            if(callback===undefined || file===undefined) angular.messages.errorFileExists();
            else{
                fileSystem.readFile(file,(e)=>{
                    if(e) callback(false);
                    else  callback(true);
                });
            }
        },

        fileWrite:(file,value,callback)=>{
            if(callback===undefined) angular.messages.errorFileExists();
            else {
                if(file===undefined && value===undefined) callback(false);
                else{
                    fileSystem.writeFile(file,value,'utf8',(e)=>{
                        if(e) callback(false);
                        else callback(true);
                    });
                }
            }
        },

        fileRead:(file,callback)=>{
            if(callback===undefined) angular.messages.errorReadFile();
            else {
                if(file===undefined) callback(false,undefined);
                else{
                    fileSystem.readFile(file,'utf8',(e,d)=>{
                        if(e) callback(false,undefined);
                        else  callback(true,d);
                    });
                }
            }
        },

        addController:(name,callback)=>{
            if(name===undefined || callback===undefined) angular.messages.errorAddController();
            else{
                angular.common.fileRead(angular.path.application,(e,d)=>{
                    if(e){
                        init = d.indexOf("('") +2;
                        end  = d.indexOf("',");
                        var nameapp     = d.substring(init,end);
                        var controller = name+'Controller';
                        var file  = angular.path.controllers+'/'+controller+'.js';
                        var value = angular.templates.constroller(nameapp,controller);
                        angular.common.fileExist(file,(e)=>{
                            if(e) angular.messages.errorAddController();
                            else{
                                angular.common.fileWrite(file,value,(e)=>{
                                    if(!e) angular.messages.errorAddController();
                                    else{
                                        var file  = angular.path.index;
                                        angular.common.fileRead(file,(e,d)=>{
                                            if(!e) angular.messages.errorAddController();
                                            else{
                                                var value = d.replace('\n\t\t<!-- addcontroller -->',angular.templates.script(controller+'.js'));
                                                angular.common.fileWrite(file,value,(e)=>{
                                                    if(!e) angular.messages.errorAddController();
                                                    else{
                                                        angular.messages.successAddController();
                                                        callback();
                                                    }
                                                });
                                            }
                                        })
                                    }
                                });
                            } 
                        });
                    }           
                });
            }
        },

        addView:(name,callback)=>{
            if(name===undefined || callback===undefined) angular.messages.errorAddView();
            else{
                var view  = name+'View';
                var file  = angular.path.views+'/'+view+'.html';
                var value = angular.templates.view('');
                angular.common.fileExist(file,(e)=>{
                    if(e) angular.messages.errorAddView();
                    else{
                        angular.common.fileWrite(file,value,(e)=>{
                            if(e) angular.messages.successAddView();
                            else  angular.messages.errorAddView();
                        })
                    }
                });
            }
        },

        addNgModule:(name,injector,callback)=>{
            if(name===undefined || injector===undefined || callback===undefined) angular.messages.errorAddNgModule();
            else{
                angular.messages.successAddNgModule();
            }
        },

        addDirective:(name,callback)=>{
            if(name===undefined || callback===undefined) angular.messages.errorAddDirective();
            else{
                angular.common.fileRead(angular.path.application,(e,d)=>{
                    if(e){
                        init = d.indexOf("('") +2;
                        end  = d.indexOf("',");
                        var nameapp     = d.substring(init,end);
                        var directive = name+'Directive';
                        var file  = angular.path.directives+'/'+directive+'.js';
                        var value = angular.templates.directive(nameapp,directive);
                        angular.common.fileExist(file,(e)=>{
                            if(e) angular.messages.errorAddDirective();
                            else{
                                angular.common.fileWrite(file,value,(e)=>{
                                    if(!e) angular.messages.errorAddDirective();
                                    else{
                                        var file  = angular.path.index;
                                        angular.common.fileRead(file,(e,d)=>{
                                            if(!e) angular.messages.errorAddDirective();
                                            else{
                                                var value = d.replace('\n\t\t<!-- adddirective -->',angular.templates.scriptDirective(directive+'.js'));
                                                angular.common.fileWrite(file,value,(e)=>{
                                                    if(!e) angular.messages.errorAddDirective();
                                                    else{
                                                        angular.messages.successAddDirective();
                                                        callback();
                                                    }
                                                });
                                            }
                                        })
                                    }
                                });
                            } 
                        });
                    }           
                });
            }
        },

        addFactory:(name,callback)=>{
            if(name===undefined || callback===undefined) angular.messages.errorAddFactory();
            else{
                angular.common.fileRead(angular.path.application,(e,d)=>{
                    if(e){
                        init = d.indexOf("('") +2;
                        end  = d.indexOf("',");
                        var nameapp     = d.substring(init,end);
                        var factory = name+'Factory';
                        var file  = angular.path.factories+'/'+factory+'.js';
                        var value = angular.templates.factory(nameapp,factory);
                        angular.common.fileExist(file,(e)=>{
                            if(e) angular.messages.errorAddFactory();
                            else{
                                angular.common.fileWrite(file,value,(e)=>{
                                    if(!e) angular.messages.errorAddFactory();
                                    else{
                                        var file  = angular.path.index;
                                        angular.common.fileRead(file,(e,d)=>{
                                            if(!e) angular.messages.errorAddFactory();
                                            else{
                                                var value = d.replace('\n\t\t<!-- addfactory -->',angular.templates.scriptFactory(factory+'.js'));
                                                angular.common.fileWrite(file,value,(e)=>{
                                                    if(!e) angular.messages.errorAddFactory();
                                                    else{
                                                        angular.messages.successAddFactory();
                                                        callback();
                                                    }
                                                });
                                            }
                                        })
                                    }
                                });
                            } 
                        });
                    }           
                });
            }
        },

        addService:(name,callback)=>{
            if(name===undefined || callback===undefined) angular.messages.errorAddService();
            else{
                angular.common.fileRead(angular.path.application,(e,d)=>{
                    if(e){
                        init = d.indexOf("('") +2;
                        end  = d.indexOf("',");
                        var nameapp     = d.substring(init,end);
                        var service = name+'Service';
                        var file  = angular.path.services+'/'+service+'.js';
                        var value = angular.templates.service(nameapp,service);
                        angular.common.fileExist(file,(e)=>{
                            if(e) angular.messages.errorAddService();
                            else{
                                angular.common.fileWrite(file,value,(e)=>{
                                    if(!e) angular.messages.errorAddService();
                                    else{
                                        var file  = angular.path.index;
                                        angular.common.fileRead(file,(e,d)=>{
                                            if(!e) angular.messages.errorAddService();
                                            else{
                                                var value = d.replace('\n\t\t<!-- addservice -->',angular.templates.scriptService(service+'.js'));
                                                angular.common.fileWrite(file,value,(e)=>{
                                                    if(!e) angular.messages.errorAddService();
                                                    else{
                                                        angular.messages.successAddService();
                                                        callback();
                                                    }
                                                });
                                            }
                                        })
                                    }
                                });
                            } 
                        });
                    }           
                });
            }
        }
     
    },
    
    // Messages de consola.
    messages:{
        errorAppName        : ()=>{console.error('No se pudo establecer un nombre de aplicación.');},
        successAppName      : ()=>{console.log  ('Se ha establecido un nombre de aplicación.');},

        errorAddController  : ()=>{console.error('No se pudo agregar el controlador.');},
        successAddController: ()=>{console.log  ('El controlador se ha agregado correctamente.');},

        errorAddView        : ()=>{console.error('No se pudo agregar la vista.');},
        successAddView      : ()=>{console.log  ('La vista se agregó correctamente.');},

        errorAddNgModule    : ()=>{console.error('No se pudo agregar el modulo de angular.');},
        successAddNgModule  : ()=>{console.log  ('El modulo de angular se agregó correctamente.');},

        errorAddDirective   : ()=>{console.error('No se pudo agregar la directiva.');},
        successAddDirective : ()=>{console.log  ('La directiva se agregó correctamente.');},

        errorAddFactory     : ()=>{console.error('No se pudo agregar la factoria.');},
        successAddFactory   : ()=>{console.log  ('La factoria se agregó correctamente.');},

        errorAddService     : ()=>{console.error('No se pudo agregar el servicio.');},
        successAddService   : ()=>{console.log  ('El servicio se agregó correctamente.');},

        errorAppInitialised : ()=>{console.error('AngularJs informa que la aplicación ya fue inicializada.');},
        errorWriteRoute     : ()=>{console.error('No se pudo agregar la ruta');},
        errorReadFile       : ()=>{console.error('No se puede leer el archivo.');},
        errorFileExists     : ()=>{console.error('No pudo determinar su un archivo existe.');},

        successReplaceName  : ()=>{console.log('La aplicación fue inicializada en forma correcta.');},
        successWriteRoute   : ()=>{console.log('Se ha agregado una ruta.')}
    },

    // Targets.
    targets:{
        
    },
    // Templates.
    templates:{

        route:(nameroute,namecontroller,nameview)=>{
            template  = "\n\t\t\t.when('/"+nameroute+"',{";
            template += "\n\t\t\t\ttemplateUrl:'views/"+nameview+".html',";
            template += "\n\t\t\t\tcontroller:'"+namecontroller+"'";
            template += "\n\t\t\t})";
            template += '\n\t\t\t//addroute.';
            return template;
        },
        constroller:(nameapp,namecontroller)=>{
            template  = "angular";
            template += "\n\t\t.module('"+nameapp+"')";
            template += "\n\t\t.controller('"+namecontroller+"',function($scope,$http){";
            template += "\n\t\t});";
            return template;
        },
        view:(namecontroller)=>{
            template  = "Ingrese aqui el c&oacute;digo html del controlador "+namecontroller+".";
            return template;
        },
        directive:(app,name)=>{
            template  = 'angular';
            template += "\n\t\t.module('"+app+"')";
            template += "\n\t\t.directive('"+name+"',function(){";
            template += "\n\t\t\treturn{";
            template += "\n\t\t\t};"
            template += "\n\t\t});";
            return template;
        },
        service:(app,name)=>{
            template  = 'angular';
            template += "\n\t\t.module('"+app+"')";
            template += "\n\t\t.service('"+name+"',function(){";
            template += "\n\t\t});";
            return template;
        },
        factory:(app,name)=>{
            template  = 'angular';
            template += "\n\t\t.module('"+app+"')";
            template += "\n\t\t.factory('"+name+"',function(){";
            template += "\n\t\t});";
            return template;
        },
        script:(namecontroller)=>{
            template  = '\n\t\t<script src="controllers/'+namecontroller+'"></script>';
            template += '\n\t\t<!-- addcontroller -->';
            return template;
        },
        scriptDirective:(namedirective)=>{
            template  = '\n\t\t<script src="directives/'+namedirective+'"></script>';
            template += '\n\t\t<!-- adddirective -->';
            return template;
        },
        scriptService:(nameservice)=>{
            template  = '\n\t\t<script src="services/'+nameservice+'"></script>';
            template += '\n\t\t<!-- addservice -->';
            return template;
        },
        scriptFactory:(namefactory)=>{
            template  = '\n\t\t<script src="factories/'+namefactory+'"></script>';
            template += '\n\t\t<!-- addfactory -->';
            return template;
        }



    }
};

module.exports = angular;