import { render, screen } from '@testing-library/react';
import {RepertoireResponse} from "../components/repertoire/RepertoirePage";
import SingleRepertoire from "../components/repertoire/SingleRepertoire";

describe('RepertoirePage component', () => {

    const mockRepertoire: RepertoireResponse = {
        filmTitle: "filmTitle",
        director: "director",
        year: 2023,
        language: "angielski",
        subtitles: true,
        genre: "komedia",
        type: "2D",
        duration: 90,
        description: "description",
        cinemaHallNumber: 1,
        startDate: "2023-08-05",
        endDate: "2023-09-20",
        time: "18:00:00"
    };

    it('<SingleReservation />', () => {
        render(<SingleRepertoire {...mockRepertoire}/>);

        expect(screen.getByText((content, element) => {
            return content.includes('Tytuł filmu') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('filmTitle') && element?.tagName.toLowerCase() === 'strong';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('90 minut') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Reżyser: director') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Rok wydania: 2023') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Język: angielski') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Napisy: PL') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Okres emisji: 2023-08-05 - 2023-09-20') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Gatunek: komedia') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Typ seansu: 2D') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Godzina: 18:00:00') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Opis: description') && element?.tagName.toLowerCase() === 'p';
        })).toBeInTheDocument();
    });

});