package com.example.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.web.dao.MemberDao;
import com.example.web.vo.Member;

@Service
public class MemberService {

	@Autowired
	MemberDao memberDao;
	
	public String login(Member m) throws Exception{
		
		return memberDao.login(m);
		
	}

	public void join(Member m) throws Exception{
		memberDao.join(m);
	}

}