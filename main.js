class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        fetch("https://api.myjson.com/bins/zyv02")
            .then(res => res.json())
            .then(data =>
            this.setState({ books: data.books })
            )
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="d-flex flex-wrap">
                {this.state.books.map((books, i) => {
                    return(
                        <div className="card flip-card col-lg-4">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img className="card-img-top" src={books.cover} alt="Card image cap"></img>
                                </div>
                                <div className="card-body flip-card-back d-flex align-items-center">
                                    <div>
                                        <h5 className="card-title">{ books.title }</h5>
                                        <p className="card-text">{ books.description }</p>
                                        <a data-fancybox="gallery" href={books.cover} className="btn btn-primary">See book cover</a>
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