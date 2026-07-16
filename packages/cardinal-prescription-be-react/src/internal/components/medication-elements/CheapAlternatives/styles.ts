import styled from 'styled-components'

export const StyledCheapAlternatives = styled.div`
  margin: 8px 0;
  border: 1px solid #d9e6f2;
  border-radius: 6px;
  overflow: hidden;
`

export const StyledCheapAlternativesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  background: #f2f8fd;
  color: #3d87c5;
  font-size: 13px;
`

export const StyledCheapAlternativesHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const StyledCheapAlternativesToggle = styled.button<{ $expanded: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: rotate(${({ $expanded }) => ($expanded ? '90deg' : '0deg')});
`

export const StyledCheapAlternativesContent = styled.ul`
  list-style: none;
  margin: 0;
  padding: 4px 0;
`

export const StyledCheapAlternativesItem = styled.li`
  button {
    width: 100%;
    text-align: left;
    padding: 6px 12px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 13px;

    &:hover {
      background: #f2f8fd;
    }
  }
`
