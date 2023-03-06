import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Modal from "../components/Modal"


const activeModalMock = {
    sprites: {

    },
    id: 1,
    name: "PokemonNameMock",
    types:[
        {
            type:{
                name: "PokemonTypeMock"
            }
        }
    ],
    weight: 1000,
    height: 20
}

const closeModalMock = jest.fn()

describe("Modal", () => {
    test("deve renderizar os elementos do Modal", () => {
        render(<Modal activeModal={activeModalMock} closeModal={closeModalMock}/>)
        screen.logTestingPlaygroundURL()

        const image = screen.getByRole('img', {
            name: /pokemonnamemock/i
          })
        const title = screen.getByText(/pokemonnamemock/i)
        const weight = screen.getByText(/100\.0 kg/i)
        const height = screen.getByText(/2\.0 m/i)
        const id = screen.getByRole('heading', {
            name: /#1 pokemonnamemock/i
        })
        const type = screen.getByText(/pokemontypemock/i)
        const button = screen.getByRole('button', {
            name: /❌/i
        })

        expect(image).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(weight).toBeInTheDocument()
        expect(height).toBeInTheDocument()
        expect(id).toBeInTheDocument()
        expect(type).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })

    test("deve testar a ação de fechar o modal pelo usuário", async () => {
        const user = userEvent.setup()
        render(<Modal activeModal={activeModalMock} closeModal={closeModalMock}/>)

        const closeButton = screen.getByRole('button', {
            name: /❌/i
        })

        await user.click(closeButton)

        expect(closeModalMock).toBeCalledTimes(1)
        expect(closeModalMock).toReturn()
    })

})