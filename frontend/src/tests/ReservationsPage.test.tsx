import {render, screen} from '@testing-library/react';
import SingleReservation, {Reservation} from "../components/reservations/SingleReservation";
import Reservations from "../components/reservations/Reservations";

describe('Reservations', () => {

    const mockReservation: Reservation = {
        reservationId: 1,
        filmTitle: "filmTitle",
        rowNumber: 1,
        seatNumber: 1,
        cinemaHallNumber: 1,
        user: "user",
        filmDate: "2023-08-10",
        filmTime: "18:00:00",
        ticketType: "normalny"
    };

    it('<SingleReservation />', () => {
        render(<SingleReservation {...mockReservation}/>);

        expect(screen.getByText((content, element) => {
            return content.includes('Tytuł filmu') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('filmTitle') && element?.tagName.toLowerCase() === 'strong';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Osoba rezerwująca: user') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Rząd: 1') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Miejsce: 1') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Sala kinowa: 1') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Data seansu: 2023-08-10') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Godzina seansu: 18:00:00') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Bilet: normalny') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
    });

});