package com.gcp.gcp_project.repository;

import com.gcp.gcp_project.model.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * An interface representing a controller for managing TicketType entities. It extends the JpaRepository interface to inherit
 * basic CRUD operations. Apart from its basic methods there is an additional method for querying given ticket types.
 */
public interface TicketTypeRepository extends JpaRepository<TicketType, Integer> {

    /**
     * Method returning a TicketType object by matching type.
     *
     * @param ticketType Ticket's type
     * @return  TicketType object matching the provided type.
     */
    TicketType findByTicketType(String ticketType);
}
