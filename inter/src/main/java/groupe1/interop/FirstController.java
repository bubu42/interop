/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package groupe1.interop;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import org.apache.catalina.connector.Response;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.codelibs.curl.Curl;


/**
 *
 * @author citak
 */
@Controller
public class FirstController {
    // curl --data "query=Who is the wife of Barack Obama" http://qanswer-core1.univ-st-etienne.fr/api/gerbil 

    String url = "http://qanswer-core1.univ-st-etienne.fr/api/gerbil ";
    String data ="--data";
    String query="";
    List test;

    

    


@GetMapping("/search")
public String TestControl(){
    return "search";
}


@GetMapping("/")
public String TestControl2(){
    return "search";
}

@GetMapping("/result")
public String getAttr(Model test ,@RequestParam String search) throws IOException {
    
    if(search!=null){
        System.out.println(search);
        test.addAttribute("search", search);
        
        this.query=search;

        search s= new search(query);
        s.requestQAnswer();
        System.out.println(s.qIds);
                return "result";
           }
    else {
        return "error";
    }
    
}




}
