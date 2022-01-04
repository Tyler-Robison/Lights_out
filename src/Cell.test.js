import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";
import flipCellsAround from './testingHelpers'

it("renders without crashing", function () {
    const row = document.createElement('tr')
    const coord = '0-0'

    render(<Cell
        key={coord}
        coord={coord}
        flipCellsAroundMe={() => flipCellsAround(coord)} />,
        { container: document.body.appendChild(row) });
});

it("matches snapshot", function () {
    const row = document.createElement('tr')
    const coord = '0-0'

    const { asFragment } = render(<Cell
        key={coord}
        coord={coord}
        flipCellsAroundMe={() => flipCellsAround(coord)} />,
        { container: document.body.appendChild(row) });

    expect(asFragment()).toMatchSnapshot();
});