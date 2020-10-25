import styled from "styled-components";

const InputSlider = styled.input`
  width: 100%;
  margin: 6.45px 0;
  background-color: transparent;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    background-color: #eae7e9;
    border: 1px solid rgba(177, 176, 178, 0.7);
    border-radius: 5.1px;
    width: 100%;
    height: 7.1px;
    cursor: pointer;
  }
  &::-webkit-slider-thumb {
    margin-top: -7.45px;
    width: 20px;
    height: 20px;
    background-color: #f56c42;
    border: 1px solid #10091e;
    border-radius: 20px;
    cursor: pointer;
    -webkit-appearance: none;
  }
  &:focus::-webkit-slider-runnable-track {
    background-color: #f56c42;
  }
  &::-moz-range-track {
    background-color: #eae7e9;
    border: 1px solid rgba(177, 176, 178, 0.7);
    border-radius: 5.1px;
    width: 100%;
    height: 7.1px;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background-color: #f56c42;
    border: 1px solid #10091e;
    border-radius: 20px;
    cursor: pointer;
  }
  &::-ms-track {
    background-color: transparent;
    border-color: transparent;
    border-width: 7.65px 0;
    color: transparent;
    width: 100%;
    height: 7.1px;
    cursor: pointer;
  }
  &::-ms-fill-lower {
    background-color: #cbc4c9;
    border: 1px solid rgba(177, 176, 178, 0.7);
    border-radius: 10.2px;
  }
  &::-ms-fill-upper {
    background-color: #eae7e9;
    border: 1px solid rgba(177, 176, 178, 0.7);
    border-radius: 10.2px;
  }
  &::-ms-thumb {
    width: 20px;
    height: 20px;
    background-color: #f56c42;
    border: 1px solid #10091e;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 0px;
    /*Needed to keep the Edge thumb centred*/
  }
  &:focus::-ms-fill-lower {
    background-color: #eae7e9;
  }
  &:focus::-ms-fill-upper {
    background-color: #ffffff;
  }
`;

export default InputSlider;
