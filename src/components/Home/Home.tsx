import React from 'react';
// import styles from './Home.module.css';
import PokeList from '../PokeList/PokeList';
import APIPokemon from '../../API/APIPokemon';

type Props = {

}
type State = {
    pokeList: APIPokemonT,
    currentPage: number,
    itemsPerPage: number
}

type APIPokemonT = {
    results: { url: string, name: string }[],
    count: number,
}

class Home extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            pokeList: {
                results: [],
                count: 0
            },
            currentPage: 0,
            itemsPerPage: 10,
        };
    }

    async componentDidMount() {
        await this.changePage();
        
    }

    async changePage(pageNumber: number=0): Promise<void> {
        const { currentPage } = this.state;
        let updated:APIPokemonT;

        if (pageNumber > currentPage) {
            
        }
        updated = await APIPokemon.getList(); 
        this.setState({pokeList:updated});
    }


    render() {
        return (
            <div>
                <h2>Pokedex</h2>
                <PokeList
                    items={this.state.pokeList.results}
                    // onPageChange={this.changePage}
                    currentPage={this.state.currentPage}
                    // itemsPerPage={10}
                    // totalItems={this.state.pokeList.count}
                />
            </div>
        );
    }
}
export default Home;