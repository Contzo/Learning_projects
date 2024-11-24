import styled from "styled-components";

const StyledFormVerticalRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-rows: auto auto auto;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0rem;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormVerticalRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormVerticalRow>
  );
}

export default FormRowVertical;
