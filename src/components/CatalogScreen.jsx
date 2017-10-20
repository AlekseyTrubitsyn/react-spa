import React from 'react';

//TODO fix antipatern, move ajax loading to container

class CatalogScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('CatalogScreen');

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const dataUrl = 'https://neto-api.herokuapp.com/etsy';

    httpGet(dataUrl).then(
      response => JSON.parse(response),
      error => { alert('Rejected: ${error}'); }
    ).then(
      response => {
        this.setState({
          data: response.slice(0, 5)
        })
      }
    );

    function httpGet(url) {
      return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
          if (this.status == 200) {
            resolve(this.response);
          } else {
            let error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };

        xhr.onerror = function() {
          reject(new Error("Network Error"));
        }

        xhr.send();
      });
    }
  }

  renderDefault() {
    return (
      <div className="loading">
        <p> Loading... </p>
        <div className="loading__spiner"></div>
      </div>
    )
  }

  renderMain() {
    return (
      <div className="catalog">
        { this.state.data.map( item => {

          let listing_id = item.listing_id || shortid.generate();
          let url = item.url || '#';
          let imageURL = item.MainImage.url_570xN || '';
          let title = item.title || '';
          let currency_code = item.currency_code || '';
          let price = item.price || ' N/A';
          let quantity = item.quantity || 0;

          title = (title.length > 50) ? (title.slice(0, 50) + "...") : title;

          let priceWithCurrency = '';

          switch (currency_code) {
            case 'USD':
              priceWithCurrency = '$' + price;
              break;

            case 'EUR':
              priceWithCurrency = '€' + price;
              break;

            default:
              priceWithCurrency = price + ' GBP';
          }

          let quantityClassName = '';

          if (quantity <= 10) {
            quantityClassName = 'catalog-item__quantity--level-low';

          } else if (quantity <= 20) {
            quantityClassName = 'catalog-item__quantity--level-medium';

          } else {
            quantityClassName = 'catalog-item__quantity--level-high';
          }

          return (
            <div className="catalog-item" key={ listing_id }>
              <div className="catalog-item__image">
                <a href={ url } >
                  <img src={ imageURL } />
                </a>
              </div>
              <div className="catalog-item__details">
                <p className="catalog-item__title">{ title }</p>
                <p className="catalog-item__price">{ priceWithCurrency }</p>
                <p className="catalog-item__quantity ${quantityClassName}">{ quantity } left</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return this.state.data.length > 0 ? this.renderMain() : this.renderDefault();
  }
}

export default CatalogScreen;
