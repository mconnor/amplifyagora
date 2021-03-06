import React from 'react'
import { Link } from 'react-router-dom'
import { Loading, Tabs, Icon } from 'element-react'
import useFetchMarketData from '../utils/useFetchMarketData'
import { formatProductDate } from '../utils'
import NewProduct from '../components/NewProduct'
import Product from '../components/Product'

const MarketPage = ({ user, userAttributes, marketId }) => {
  const {
    market,
    isMarketOwner,
    isLoading,
    isEmailVerified,
  } = useFetchMarketData({
    user,
    userAttributes,
    marketId,
  })

  return isLoading ? (
    <Loading fullscreen={true} />
  ) : (
    <>
      {/* Back button*/}
      <Link className="link" to="/">
        Back to Markets List
      </Link>

      {/* Market MetaData */}
      <span className="items-center pt-2">
        <h2 className="mb-mr">{market.name}</h2> - {market.owner}
      </span>
      <div className="items-center pt-2">
        <span style={{ color: 'var(--lightSquidInk)', paddingBottom: '1em' }}>
          <Icon name="date" className="icon" />
          {formatProductDate(market.createdAt)}
        </span>
      </div>

      {/* New Product */}
      <Tabs type="border-card" value={isMarketOwner ? '1' : '2'}>
        {isMarketOwner && (
          <Tabs.Pane
            label={
              <>
                <Icon name="plus" className="icon" />
                Add Product
              </>
            }
            name="1"
          >
            {isEmailVerified ? (
              <NewProduct marketId={marketId} />
            ) : (
              <Link to="/profile" className="header">
                Verify Your Email Before Adding Products
              </Link>
            )}
          </Tabs.Pane>
        )}

        {/* Products List */}
        <Tabs.Pane
          label={
            <>
              <Icon name="menu" className="icon" />
              Products ({market.products.items.length})
            </>
          }
          name="2"
        >
          <div className="product list">
            {market.products.items.map(product => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </Tabs.Pane>
      </Tabs>
    </>
  )
}

export default MarketPage
