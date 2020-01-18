import React, { useRef } from 'react';
import { Label } from 'components/atoms/Label';
import Icon from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import PropTypes from 'prop-types';

const FileUploadIcon = props => {
    const label = useRef(null);
    
    return (
        <>
            <Label ref={label} htmlFor='file-upload'>
                <Button
                    borderRadius={props.borderRadius}
                    padding={props.padding}
                    height={props.height}
                    width={props.width}
                    onClick={() => label.current.click()}
                >
                    <Icon iconName='file-upload' />
                </Button>
            </Label>
            <Input onChange={props.onChange} style={{ display: 'none' }} id='file-upload' type='file' />
        </>
    );
}

FileUploadIcon.defaultProps = {
    height: '40px',
    width: '40px',
    padding: '9px 7px',
}

FileUploadIcon.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
    padding: PropTypes.string,
};

export default FileUploadIcon;