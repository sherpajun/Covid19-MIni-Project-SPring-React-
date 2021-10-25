package com.example.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.web.dao.BoardDAO;
import com.example.web.vo.Board;

@Service
public class BoardService {
	
	@Autowired
	BoardDAO boardDAO;
	
	public List<Board> boardList(){
		return boardDAO.boardList();
	}
	
	public List<Board> boardList(int pageNo) {
		
		return boardDAO.boardList2over(pageNo);
	
}


	public void boardWrite(Board b) throws Exception{
		boardDAO.boardWrite(b);
		
	}

	public int boardCount() {
		return boardDAO.boardCount();
	}

	
}