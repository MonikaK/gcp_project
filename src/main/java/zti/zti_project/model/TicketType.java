package zti.zti_project.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * A class representing the ticket_type PostreSQL entity in the system. It contains fields with information about the ticket
 * type such as: ticketTypeId, ticket type.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
public class TicketType {
    @Id
    @Column
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Integer ticketTypeId;

    @Column
    private String ticketType;

    /**
     * A constructor with only ticket type as an argument, the ticket type id is a generated value.
     *
     * @param  ticketType Ticket's type
     */
    public TicketType(String ticketType) {
        this.ticketType = ticketType;
    }
};