package com.example.web.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import com.example.web.vo.Member;

@Mapper
@Repository
public interface MemberDao {

	public String login(Member m) throws DataAccessException;

	public void join(Member m) throws DataAccessException;

}
