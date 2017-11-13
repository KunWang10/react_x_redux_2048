import React, { Component } from 'react'
import '../css/index.css';

class Tile extends Component {
    render(){
        const value = !this.props.value ? '' : this.props.value;
        const col_end = this.props.col_end;
        const tile_style = !value ? 'tile value-zero' : 'tile value-'+value;
        const col_style = col_end ? 'grid-col-end' : 'grid-col';

        return(
            <div className={col_style}>
                <div className={tile_style}>{value}</div>
            </div>
        );
    }
  }
  
  export default Tile
  