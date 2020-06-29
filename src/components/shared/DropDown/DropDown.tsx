import React from "react";
// import styles from './DropDown.module.css';
// import { Dropdown, FormControl } from "react-bootstrap";

type Props = {
  options: string[],
  title: string,
  onChange(option: string): void,
  'data-testid'?: string
};

class DropDown extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

    render() {
        return(
            <select
                data-testid={this.props['data-testid']}
                style={{
                    border: '0',
                    padding: '.5rem',
                    borderRadius:'.2rem'
                }}
                placeholder={this.props.title}
                onChange={(e) => { this.props.onChange(e.target.value); }}
            >
                {
                    this.props.options.map((option, index) => {
                        return (
                            <option key={index}>{option}</option>
                        )
                    })
                }
            </select>
        )
    // return (
    //   <Dropdown>
    //     <Dropdown.Toggle variant="success" id="dropdown-basic">
    //       {this.props.title}
    //     </Dropdown.Toggle>

    //     <Dropdown.Menu as={this.CustomMenu}>
    //       {this.props.options.map((option) => (
    //           <Dropdown.Item onClick={(e:any) => { e.preventDefault(); console.log(option) }}>{option}</Dropdown.Item>
    //       ))}
    //     </Dropdown.Menu>
    //   </Dropdown>
    // );
  }
}
export default DropDown;
