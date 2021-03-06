import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import LocationItem from './LocationItem';

class LocationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'locations': '',
            'query': '',
            'suggestions': true,
        };

        this.filterLocations = this.filterLocations.bind(this);
    }

    filterLocations(event) {
        this.props.closeInfoWindow();
        const {value} = event.target;
        var locations = [];
        this.props.datlocations.forEach(function (location) {
            if (location.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                location.marker.setVisible(true);
                locations.push(location);
            } else {
                location.marker.setVisible(false);
            }
        });

        this.setState({
            'locations': locations,
            'query': value
        });
    }

    componentWillMount() {
        this.setState({
            'locations': this.props.datlocations
        });
    }

    render() {
        var locationlist = this.state.locations.map(function (listItem, index) {
            return (
                <LocationItem 
                    key={index} 
                    openInfoWindow={this.props.openInfoWindow.bind(this)} 
                    data={listItem}/>
            );
        }, this);

        return (
            <div aria-labelledby="location_list">
                <TextField
                    name="value"
                    value={this.state.query}
                    onChange={this.filterLocations}
                    floatingLabelText="filter"
                    fullWidth={true}
                    aria-labelledby="location_filter"
                />
                
                {this.state.suggestions && locationlist}                
            </div>
        );
    }
}

export default LocationList;