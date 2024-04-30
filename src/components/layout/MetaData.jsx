import { Helmet } from 'react-helmet';

function MetaData({title}) {
  return (
    <Helmet>
      <title>{`${title} - ShopIT`}</title>
    </Helmet>
  )
}

export default MetaData