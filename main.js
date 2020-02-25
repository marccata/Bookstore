class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchValue: ""
        };
    }

    componentDidMount() {
        if (document.getElementById("langEn").checked == true) {var url = "https://api.myjson.com/bins/zyv02"};
        if (document.getElementById("langEs").checked == true) {var url = "https://api.myjson.com/bins/1h3vb3"};
        fetch(url)
            .then(res => res.json())
            .then(data =>
            this.setState({ books: data.books })
            )
        .catch(error => console.log(error));
    }
    
    searchFilter = (e) => {
        var searchValue = e.target.value;
        console.log(searchValue);        
        this.setState({
            searchValue: event.target.value
        });

    }

    render() {
        return (
            <div className="d-flex flex-wrap">
                <div className="col-12">
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        Warning: the language switch is not working yet!
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div className="col-12">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="menuFilter" onChange={this.searchFilter}/>
                </div>
                {/****** PRINT CARDS AFTER FILTERING (EVEN IF THERE IS SEARCHVALUE OR NOT) ******/}
                {this.state.books.filter(book => book.title.toLowerCase().includes(this.state.searchValue.toLowerCase()) || this.state.searchValue === "").map((books, i) => {
                    return(
                        <div className="card flip-card col-lg-4" key={i}>
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img className="card-img-top" src={books.cover} alt="Card image cap"></img>
                                </div>
                                <div className="card-body flip-card-back d-flex align-items-center">
                                    <div>
                                        <h5 className="card-title">{ books.title }</h5>
                                        <p className="card-text">{ books.description }</p>
                                        <a data-fancybox="gallery" href={books.detail} className="btn btn-primary">See in detail</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById("app"));