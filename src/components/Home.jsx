import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load as loadItems } from '../actions/realty'
import RealtyList from './RealtyList.jsx'

export default connect(
  ({ realty }) => ({
    loadingItems: realty.loadingItems,
    lastLoaded: realty.lastLoaded,
    items: realty.items
  }),
  (dispatch) => bindActionCreators({ loadItems }, dispatch)
)(RealtyList)
