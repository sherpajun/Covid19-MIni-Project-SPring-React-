package com.example.web.controller;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.web.service.MemberService;
import com.example.web.vo.Member;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MemberController {
	
	@Autowired
	MemberService memberService;
	
	@PostMapping("login")
	public String login(@ModelAttribute Member m, HttpSession session) {
		JSONObject json = new JSONObject();
		System.out.println(m);
		
		try {
			String name = memberService.login(m);
			// 로그인 성공
			if(name!=null) {
				m.setName(name);
				session.setAttribute("m", m);
				json.put("name", name);
			} else {
				json.put("errMsg", "아이디 비밀번호를 확인해주세요.");
			}
		}catch(Exception e) {
			json.put("errMsg", "로그인 오류");
		}
		
		return json.toString();
	}
	
	@PostMapping("logout")
	public void logout(HttpSession session) {
		session.invalidate();  // session 무효화
	}
	
	@PostMapping("join")
	public String join(@ModelAttribute Member m) {
		try {
			System.out.println(m);
			memberService.join(m);
			return "성공?";
		}catch(Exception e) {
			e.printStackTrace();
			return "회원 가입 실패 : id를 확인하세요";
		}
	}
}
