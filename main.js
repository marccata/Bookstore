class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchValue: ""
        };
    }

    componentDidMount() {
        fetch("https://api.myjson.com/bins/zyv02")
        .then(res => res.json())
        .then(data => this.setState({ books: data.books }))
        .catch(error => console.log(error));
    }
    
    searchFilter = (e) => {
        this.setState({
            searchValue: e.target.value
        }, () => {
            this.checkIfEmpty();
        });

    }

    checkIfEmpty() {
        if(document.getElementById('booksDiv').innerHTML == "") {
            document.getElementById('emptyMessage').style.visibility = 'visible';
        } else {
            document.getElementById('emptyMessage').style.visibility = 'hidden';
        }
    }

    render() {
        console.log(this.state.books);
        return (
            <main className="container" id="mainContainer">
                <div className="d-flex flex-wrap">
                    <div className="col-12 mt-30">
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            Warning: the language switch is not working yet!
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-12">
                        <input className="form-control mr-sm-2 col-12" type="search" placeholder="Search your book" aria-label="Search" id="menuFilter" onChange={this.searchFilter}/>
                    </div>
                    <div  className="d-flex flex-wrap width-100" id="booksDiv">
                        {this.state.books.filter(book => book.title.toLowerCase().includes(this.state.searchValue.toLowerCase()) || this.state.searchValue === "").map((books, i) => {
                            return(
                                <div className="card flip-card col-lg-4" key={i}>
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <img className="card-img-top" src={books.cover} alt={books.title}></img>
                                        </div>
                                        <div className="card-body flip-card-back d-flex align-items-center">
                                            <div>
                                                <h5 className="card-title">{ books.title }</h5>
                                                <p className="card-text">{ books.description }</p>
                                                <a data-fancybox="gallery" href={books.detail} className="btn btn-light">See in detail</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div id="emptyMessage" className="container">
                        <div className="alert   alert-secondary" role="alert">Your search has no matches...</div>
                    </div>
                </div>
            </main>
        )
    }

}

ReactDOM.render(<App />, document.getElementById("app"));