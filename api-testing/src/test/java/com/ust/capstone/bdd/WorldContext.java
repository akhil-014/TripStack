package com.ust.capstone.bdd;

import com.ust.capstone.data.repository.BookingRepository;
import io.restassured.response.Response;

import java.sql.Connection;

public class WorldContext {

    // API Context
    private String token;
    private long empId;
    private String role;
    private String displayName;
    private int responseStatus;
    private Response response;
    private String otherUserBookingId;

    //DB
    private Connection connection;
    private BookingRepository bookingRepository;

    public Connection getConnection() {
        return connection;
    }

    public void setConnection(Connection connection) {
        this.connection = connection;
    }

    public BookingRepository getBookingRepository() {
        return bookingRepository;
    }

    public void setBookingRepository(
            BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    //  API
    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getEmpId() {
        return empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public int getResponseStatus() {
        return responseStatus;
    }

    public void setResponseStatus(int responseStatus) {
        this.responseStatus = responseStatus;
    }


    public String getOtherUserBookingId() {
        return otherUserBookingId;
    }

    public void setOtherUserBookingId(String otherUserBookingId) {
        this.otherUserBookingId = otherUserBookingId;
    }

}