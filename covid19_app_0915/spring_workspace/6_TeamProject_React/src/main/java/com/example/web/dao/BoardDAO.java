package com.example.web.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;
import com.example.web.vo.Board;

@Mapper
@Repository
public interface BoardDAO {

	List<Board> boardList() throws DataAccessException;

	void boardWrite(Board b) throws DataAccessException;

	List<Board> boardList2over(int pageNo) throws DataAccessException;

	int boardCount();

}

