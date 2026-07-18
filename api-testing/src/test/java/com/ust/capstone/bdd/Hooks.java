package com.ust.capstone.bdd;

import com.ust.capstone.data.repository.BookingRepository;
import com.ust.capstone.data.db.DatabaseConfig;
import io.cucumber.java.After;
import io.cucumber.java.Before;

import java.sql.Connection;
import java.sql.DriverManager;

public class Hooks {

    private final WorldContext context;

    public Hooks(WorldContext context) {
        this.context = context;
    }

    @Before(order = 0)
    public void setUp() throws Exception {

        DatabaseConfig.start();

        Connection connection =
                DriverManager.getConnection(
                        DatabaseConfig.jdbcUrl(),
                        DatabaseConfig.username(),
                        DatabaseConfig.password()
                );

        context.setConnection(connection);

        context.setBookingRepository(
                new BookingRepository(connection)
        );
    }

    @After
    public void tearDown() throws Exception {

        if (context.getConnection() != null &&
                !context.getConnection().isClosed()) {

            context.getConnection().close();
        }
    }
}