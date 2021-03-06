import React, { useContext } from 'react'
import { Platform, Dimensions } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import { Ionicons, Feather, MasterCardIcon, VisaIcon } from '@icons'
import { ETASimpleText } from '@etaui'
import { useTranslation } from '@etaui/translate'

const {width} = Dimensions.get('window')
const iconSize = 23

const Card = styled.View`
    flex-direction: row;
    width: ${width - 20}px;
    min-height: 60px;
    justify-content: center;
    align-self: center;
    background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    border-radius: 5px
    padding: 7px 10px;
    margin-bottom: 5px;
`
const MetadataInfo = styled.View`
	flex: 0.9;
	width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	background-color: transparent;
`
const MetadataInfoHead = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`
const MetadataInfoSubHead = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
	padding-vertical: 4px;
`
const CompanyIconContainer = styled.View`
	padding-horizontal: 10px;
`
const IconContainer = styled.View`
	flex: 0.1;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`

const DirectionCardComponent = ({
	alias,
	cardType,
	details,
	expDate,
	company,
	owner,
	isDefault,
}) => {
	const themeContext = useContext(ThemeContext)
	const { debit_card, credit_card } = useTranslation()

	const companySwitch = () => {
		switch (company) {
			case 'MasterCard':
				return <MasterCardIcon size={35} />
				break
			case 'Visa':
				return (
					<VisaIcon />
				)
				break

			default:
				break
		}
	}

	return (
		<>
			<Card>
				<MetadataInfo>
					<MetadataInfoHead>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '400'
									: '800'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							{alias.charAt(0).toUpperCase() + alias.slice(1)}
						</ETASimpleText>
						{isDefault ? (
							<Ionicons
								name='ios-star'
								size={14}
								color={themeContext.STAR}
								style={{
									marginHorizontal: 2,
								}}
							/>
						) : null}
					</MetadataInfoHead>
					<ETASimpleText
						size={13}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='left'>
						{details}
					</ETASimpleText>
					<MetadataInfoSubHead>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '400'
									: '800'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							{
								cardType === 1
								?	debit_card.charAt(0).toUpperCase() + debit_card.slice(1)
								:	credit_card.charAt(0).toUpperCase() + credit_card.slice(1)
							}
						</ETASimpleText>
						<CompanyIconContainer>
							{companySwitch()}
						</CompanyIconContainer>
						
						<ETASimpleText
							size={11}
							weight={
								Platform.OS === 'ios' ? '300' : '200'
							}
							color={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
							}
							align='left'>
							{expDate}
						</ETASimpleText>
					</MetadataInfoSubHead>
					<ETASimpleText
						size={11}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.PRIMARY_TEXT_COLOR_LIGHT
						}
						align='left'>
						{owner}
					</ETASimpleText>
				</MetadataInfo>
				<IconContainer>
					<Feather
						name='chevron-right'
						size={15}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
					/>
				</IconContainer>
			</Card>
		</>
	)
}

export default React.memo(DirectionCardComponent)
