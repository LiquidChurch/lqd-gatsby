import debounce from 'lodash.debounce';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import "./styles.css"
import Row from 'react-bootstrap/Row'

import { ArrowRight, ArrowLeft } from '../../helpers/icons'

const { node, func } = PropTypes;

const shiftWidth = 265.5 + 12;

/** 
 * Component Slider
 */
class ComponentSlider extends React.Component {
  static displayName = 'ComponentSlider';
  
  static propTypes = {
    children: node.isRequired,
    renderLeftArrow: func,
    renderRightArrow: func,
  };

  static defaultProps = {
    renderLeftArrow: () => <ArrowLeft />,
    renderRightArrow: () => <ArrowRight />,
  };

  constructor(props) {
    super(props);
    console.log(props)
    this.touchEnabled = props.touchEnabled
    this.touchClass = props.touchClass
    this.setSliderRef = element => {
      this.slider = element;
    };
    this.setSliderContentRef = element => {
      this.sliderContent = element;
    };

    this.state = {
      marginLeft: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize());
    this.resetMargin();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize());
  }

  resetMargin = () => {
    if (this.slider && this.sliderContent) {
      this.setState({ marginLeft: 0 });
    }
  }

  handleLeftClicked = () => {
    const currentMarginLeft = this.state.marginLeft;
    let marginLeft;

    if (currentMarginLeft > shiftWidth) {
      marginLeft = currentMarginLeft - shiftWidth;
    } else {
      marginLeft = 0;
    }

    this.setState({ marginLeft });
  }

  handleRightClicked = () => {
    const currentMarginLeft = this.state.marginLeft;
    const sliderWidth = this.slider.offsetWidth;
    const contentWidth = this.sliderContent.offsetWidth;
    const remainingWidth = contentWidth - (sliderWidth) - currentMarginLeft;
    let marginLeft;

    if (remainingWidth > 0) {
      if (remainingWidth <= shiftWidth) {
        marginLeft = currentMarginLeft + remainingWidth;
      } else {
        marginLeft = currentMarginLeft + shiftWidth;
      }
    } else {
      marginLeft = currentMarginLeft;
    }

    this.setState({ marginLeft });
  }

  handleResize = () => {
    this.updateFn = this.updateFn || debounce(() => { this.resetMargin(); }, 200);
    return this.updateFn;
  }

  renderLeftArrow = () => {
    if (this.state.marginLeft !== 0) {
      return (
        <button className="caret caret-left" onClick={this.handleLeftClicked}>
          {this.props.renderLeftArrow()}
        </button>
      );
    }
    return null;
  }

  renderRightArrow = () => {
    const currentMarginLeft = this.state.marginLeft;
    const sliderWidth = this.slider ? this.slider.offsetWidth : 0;
    const contentWidth = this.sliderContent ? this.sliderContent.offsetWidth : 0;
    const remainingWidth = contentWidth - (sliderWidth) - currentMarginLeft;

    if (remainingWidth > 0) {
      return (
        <button className="caret caret-right" onClick={this.handleRightClicked}>
          {this.props.renderRightArrow()}
        </button>
      );
    }
    return null;
  }

  render = () => {
    let componentClass = ""
    
    if (this.touchEnabled) {
      componentClass='component-row-touch'
    } else {
      componentClass='component-row'
    }
    
    return (
      <>
      <div  ref={this.setSliderRef}>
        {this.renderLeftArrow()}
        {this.renderRightArrow()}
        <div className="component-slider">
          <Row 
            className={'flex-nowrap no-scroll-bar ' + componentClass}
            ref={this.setSliderContentRef}
            style={{ marginLeft: `-${this.state.marginLeft}px` } }
          >
            {this.props.children}
          </Row>
        </div>        

      </div>
      </>
    );
  }
}

export default ComponentSlider;