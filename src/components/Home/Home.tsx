import React from 'react';
import styles from './Home.module.scss'; 
import PokeList from '../PokeList/PokeList';
import APIPokemon from '../../API/APIPokemon';
import RequestHandler from '../../API/RequestHandler';

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
    next: string | null,
    previous: string | null,
}

class Home extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            pokeList: {
                results: [],
                count: 0,
                next: null,
                previous: null,
            },
            currentPage: 0,
            itemsPerPage: 10,
        };
    }

    async componentDidMount() {
        await this.fetchItems(null);
    }

    async fetchItems(url: string | null) {
        let list;
        if (url !== null) {
            list = await RequestHandler.get(url);
        } else {
            list = await APIPokemon.getList();
        }
        this.setState({ pokeList: list });
    }

    render() {
        const { pokeList } = this.state;
        return (
            <div>
                <h2 className={styles.title}>Pokedex</h2>
                <PokeList
                    items={this.state.pokeList.results}
                    next={() => (this.fetchItems(pokeList.next))}
                    previous={()=>(this.fetchItems(pokeList.previous))}
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