import * as Feather from 'react-feather';

// This module re-exports a stable set of icon names used across the app
// mapping them to the closest `react-feather` equivalents. If an exact
// match is not available, a sensible fallback is used.

const F: any = Feather;

export const Bell = F.Bell;
export const TrendUp = F.TrendingUp || F.ArrowUp;
export const TrendDown = F.TrendingDown || F.ArrowDown;
export const Minus = F.Minus;
export const ArrowCircleUp = F.ArrowUp || F.ChevronUp;
export const ArrowCircleDown = F.ArrowDown || F.ChevronDown;
export const ArrowLeft = F.ArrowLeft;
export const Warning = F.AlertTriangle || F.AlertCircle || F.Info;
export const PencilSimple = F.Edit || F.Pen || F.Edit2;
export const Coin = F.DollarSign || F.Coin || F.CreditCard;
export const Target = F.Target;
export const Shield = F.Shield;
export const X = F.X;
export const SignOut = F.LogOut || F.Power;
export const Moon = F.Moon;
export const Sun = F.Sun;
export const User = F.User;
export const GoogleChromeLogo = F.Globe || F.Chrome || F.ExternalLink;
export const Eye = F.Eye;
export const ArrowRight = F.ArrowRight;
export const CalendarBlank = F.Calendar;
export const CheckCircle = F.CheckCircle || F.Check;
export const Clock = F.Clock;
export const Heart = F.Heart;
export const Trophy = F.Award || F.Trophy || F.Star;
export const Rocket = F.Rocket || F.FiRocket || F.ArrowUp;
export const Crown = F.Crown || F.Star;
export const House = F.Home;
export const ChartLine = F.Activity || F.BarChart || F.LineChart;
export const Gear = F.Settings || F.GitCommit || F.Tool;
export const Drop = F.Droplet || F.Droplet;
export const CurrencyDollar = F.DollarSign;
export const Info = F.Info;
export const Lightning = F.Zap || F.Flash || F.Lightning;
export const Lock = F.Lock;
export const Calendar = F.Calendar;
export const Plus = F.Plus || F.PlusCircle;
export const Wallet = F.CreditCard || F.Briefcase;
export const ShoppingCart = F.ShoppingCart || F.ShoppingBag;
export const PiggyBank = F.DollarSign || F.CreditCard;
export const Pencil = F.Edit || F.Edit2;
export const Trash = F.Trash || F.Trash2;
export const Bot = F.MessageCircle || F.MessageSquare;
export const TrendingUp = F.TrendingUp;
export const TrendingDown = F.TrendingDown;
export const PlusCircle = F.PlusCircle;
export const Send = F.Send;
export const Lightbulb = F.Zap || F.Lightbulb || F.Sun;
export const AlertCircle = F.AlertCircle;
export const Activity = F.Activity;
export const AlertTriangle = F.AlertTriangle;
export const Tag = F.Tag;
export const FileText = F.FileText;

export default F;
