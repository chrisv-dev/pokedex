import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HashRouter, Route } from "react-router-dom";
import PokeDetail from "./PokeDetail";
import { within } from "@testing-library/dom";

const getMove = (name: string, version: string) => {
  return {
    move: { name: name },
    version_group_details: [
      {
        version_group: { name: version },
        move_learn_method: { name: "level" },
      },
    ],
  };
};

const moves = [
    getMove("move1", "v1"),
    getMove("move2", "v1"),
    getMove("move3", "v1"),
    getMove("move4", "v1"),
    getMove("move5", "v1"),
    getMove("move6", "v1"),
    getMove("move7", "v2"),
]

const renderComponent = () =>
  render(
    <HashRouter>
      <Route path="/">
        <PokeDetail
          name=""
          order={23}
          sprites={{ mySprite: "value" }}
          types={[{ type: { name: "water" } }]}
          abilities={[{ ability: { name: "fly" } }]}
          stats={[{ base_stat: 12, effort: 3, stat: { name: "attack" } }]}
          moves={moves}
          evolutions={{
            chain: {
              species: { name: "parent" }, evolves_to: [
                { species: { name: "child1" }, evolves_to: [] },
                { species: { name: "child2" }, evolves_to: [
                    { species: { name: "child3" }, evolves_to: [] },
                ] }
            ] },
          }}
          species={{ name: "", url: "" }}
        />
      </Route>
    </HashRouter>
  );

test("renders component", () => {
  const { getByTestId } = renderComponent();
  const comp = getByTestId("poke-detail");
  expect(comp).toBeDefined();
});

test("renders 5 moves from first version", () => {
    const { getAllByTestId } = renderComponent();
    const move = getAllByTestId("move");
    const { getByText } = within(move[0]);
    expect(getByText("move1")).toBeInTheDocument();
    expect(move).toHaveLength(5);
});

test("renders second page of 'moves' when clicking next", () => {
  const { getByTestId, getAllByTestId } = renderComponent();
  const next = getByTestId("next");
  userEvent.click(next);
  const moves = getAllByTestId("move");
  const { getByText } = within(moves[0]);
  expect(getByText("move6")).toBeInTheDocument();
  expect(moves).toHaveLength(1);
});

test("updates 'moves' when changing version with dropdown", () => {
  const { getByTestId, getAllByTestId } = renderComponent();  
  const selectVersion = getByTestId("select");
  userEvent.selectOptions(selectVersion, "v2");
  const moves = getAllByTestId("move");
  const { getByText } = within(moves[0]);
  expect(getByText("move7")).toBeInTheDocument();
  expect(moves).toHaveLength(1);
});

test("renders correct number of evolutions", () => {
  const { getAllByTestId } = renderComponent();  
  const evolutions = getAllByTestId("evolution");
  expect(evolutions).toHaveLength(4);
});