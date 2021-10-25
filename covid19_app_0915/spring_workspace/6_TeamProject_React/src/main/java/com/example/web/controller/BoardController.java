package com.example.web.controller;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.web.service.BoardService;
import com.example.web.vo.Board;
import com.example.web.vo.Member;

@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // 허용 하겠다느 ㄴ뜻
public class BoardController {
   
   @Autowired
   BoardService boardService;
   
   @PostMapping("/boardWrite")
   
   @ResponseBody
   public String boardWrite(@ModelAttribute Board b, HttpSession session, HttpServletResponse response) {
      Member m = (Member)session.getAttribute("m");
      System.out.println(m);
      if(m==null) {
         return "로그인 해주세요";
      }else {
         b.setId(m.getId());
         if(b.getArticleNO()>0) {
           b.setParentNO(b.getArticleNO());
           b.setArticleNO(0);
         }
         System.out.println(b);
         try {
            boardService.boardWrite(b);
            
            }catch(Exception e) {
            e.printStackTrace();
            return "글 등록 실패";
         }
         return "글 등록 완료";
      }
   }
   
   @GetMapping("/boardCount")
   @ResponseBody
   public int boardCount() {
	   return boardService.boardCount();
   }
   
   @GetMapping("/boardList")
   @ResponseBody
   public String boardList(HttpServletRequest request) {
	  String page=request.getParameter("page");
	  int pageNo = Integer.parseInt(page);
	  //System.out.println(pageNo);
	  
      List<Board> list=boardService.boardList(pageNo);
      JSONArray arr=new JSONArray();
      for(Board b:list) {
         JSONObject o=new JSONObject();
         o.put("articleNo", b.getArticleNO());
         o.put("title", b.getTitle());
         o.put("content", b.getContent());
         o.put("id", b.getId());
         o.put("parentNo", b.getParentNO());
         o.put("writeDate", b.getWriteDate().toString());
         o.put("level", b.getLevel());
         arr.add(o);
      }
      System.out.println(arr);
      return arr.toJSONString();
   }
}