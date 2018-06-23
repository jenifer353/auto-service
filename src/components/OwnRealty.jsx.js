import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadOwn as loadItems } from '../actions/realty'
import RealtyList from './RealtyList.jsx'

export default connect(
  ({ realty }) => ({
    loadingItems: realty.loadingOwn,
    lastLoaded: realty.lastLoadedOwn,
    items: realty.ownItems
  }),
  (dispatch) => bindActionCreators({ loadItems }, dispatch)
)(RealtyList)
