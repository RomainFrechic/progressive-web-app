import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const VerticalMenu = (props)=> (
		<div>
		    <IconMenu
		    	className="InconMenu"
				iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
				anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
		    >
				<MenuItem onTouchTap={props.newInstall} primaryText="Faire une nouvelle installation" />
				<MenuItem primaryText="Se rendre sur IDIAG web" />
				<MenuItem primaryText="Options" />
				<MenuItem primaryText="Aide" />
				<MenuItem onTouchTap={props.logout} primaryText="Se déconnecter" />
		    </IconMenu>
	    </div>
    );
export default VerticalMenu;