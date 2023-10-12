import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { getNodeByDisplayType } from '../FilterViewHelper'
import { ThemeProvider, createTheme } from '@mui/material/styles';
export default function FilterCriteriaList({
  filters,
  toggleFilter,
  selectedFilters,
  onReset,
  onFilter,
}) {
  const { t } = useTranslation('common')
  const updateCheckedState = (index, group) => {
    toggleFilter(index, group)
  }
  const badgeTheme = createTheme({
    components: {
      MuiBadge: {
        styleOverrides: {
          badge: {
            backgroundColor: 'rgb(255, 6, 126)',
            color: 'white',
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={badgeTheme}>
    <Grid
      container
      flexDirection="column"
      justifyContent="space-between"
      flexWrap="nowrap"
      height="100%"
      width={450}
    >
      <Grid container item justifyContent="center">
        <Grid
          item
          position="sticky"
          top={0}
          zIndex={1000}
          xs={12}
          backgroundColor={(theme) => theme.palette.background.default}
        >
          <Typography variant="h6" py={2} align="center">
            {t('All filters')}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={10}>
          {filters
            ?.filter(({ hidden, data }) => !hidden && data?.length)
            ?.map(({ title, data = [], group, displayType }) => (
              <>
                <Accordion key={group} elevation={0} sx={{ py: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" component="div" >
                      {t(title)}
                     
                    </Typography>
                    {selectedFilters[group] &&
                      selectedFilters[group].length > 0 ? (
                      <Badge
                        badgeContent={selectedFilters[group].length}
                        color="primary"
                        style={{backgroundColor:"rgb(255, 6, 126)",color:"white"}}
                        anchorOrigin={{
                          vertical: 'center',
                          horizontal: 'right',
                        }}
                      />
                    ) : null}
                  </AccordionSummary>

                  <AccordionDetails>
                    {getNodeByDisplayType(
                      displayType,
                      data,
                      selectedFilters,
                      updateCheckedState,
                      group,
                      t(title)
                    )}
                  </AccordionDetails>
                </Accordion>
                <Divider />
              </>
            ))}
        </Grid>
      </Grid>

      <Grid
        container
        item
        bottom={0}
        position="sticky"
        justifyContent="space-evenly"
        pb={3}
        backgroundColor={({ palette }) => palette.background.default}
      >
        <Grid item xs={12} pb={3}>
          <Divider />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="large"
           
            onClick={onReset}
            style={{borderColor:"rgb(255, 6, 126)",color:"rgb(255, 6, 126)"}} 
          >
            {t('erase')}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" size="large" style={{backgroundColor:"rgb(255, 6, 126)"}} onClick={onFilter}>
            {t('filter')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
    </ThemeProvider>
  )
}
FilterCriteriaList.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.any).isRequired,
  toggleFilter: PropTypes.func.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  onReset: PropTypes.func,
  onFilter: PropTypes.func,
}

FilterCriteriaList.defaultProps = {
  onReset: () => {},
  onFilter: () => {},
}
