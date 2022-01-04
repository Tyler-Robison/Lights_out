import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from './Board'

it("renders without crashing", function () {
    render(<Board />);
});

// there will be randomness ff chanceLightStartsOn !== 0 or 1 .

it("matches snapshot with all lights on", function () {
    const { asFragment } = render(<Board chanceLightStartsOn={1.0} />);
    expect(asFragment()).toMatchSnapshot();
});

test("that correct cells flip upon click", function () {
    const { getByTestId } = render(<Board chanceLightStartsOn={1.0} />);
    
    const topLeftCell = getByTestId('0-0')
    const oneBelow = getByTestId('1-0')
    const oneToRight = getByTestId('0-1')
    const twoToRight = getByTestId('0-2')
    expect(topLeftCell).toHaveClass('Cell Cell-lit')
    expect(oneBelow).toHaveClass('Cell Cell-lit')
    expect(oneToRight).toHaveClass('Cell Cell-lit')
    expect(twoToRight).toHaveClass('Cell Cell-lit')
    fireEvent.click(topLeftCell)
    expect(topLeftCell).toHaveClass('Cell')
    expect(oneBelow).toHaveClass('Cell')
    expect(oneToRight).toHaveClass('Cell')
    expect(twoToRight).toHaveClass('Cell Cell-lit')
    fireEvent.click(twoToRight)
    expect(twoToRight).toHaveClass('Cell')
    expect(oneToRight).toHaveClass('Cell Cell-lit')
});

